import math

S = 5600   # initial credit amount
n = 240    # months
p = 5      # year percent
m = 37    # monthly payment

p /= 1200
if S*p >= m:
	print('Credit can not be paid.')
	print('SHOULD BE: Min monthly payment: %.2f' % (S*p))
	print('       OR: Max year percent:    %.2f' % (m/S*1200))
	print('       OR: Max initial amount:  %.2f' % (m/p))
	exit()

nx = math.ceil(- math.log(1 - S*p/m) / math.log(1+p))
print('Need %d months (%.1f years) - instead of %d months requested' % (nx, nx/12, n))

w = (1+p)**n

mx = S*p * w / (w-1)
print('Pay %.2f monthly - instead of %.2f requested' % (mx, m))

Sx = m/p * (1 - 1/w)
print('Available %.2f - instead of %.2f requested' % (Sx, S))

# to find optimal percent, use bisection solver
px = [0.001/1200, 0, 100/1200]   # from 0.001% to 100% yearly
px[1] = (px[0] + px[2])/2
Sx = [w*(S - m/x) + m/x for x in px]
while abs(Sx[1]) > 1:
	if Sx[1] < 0:
		px[0] = px[1]
		Sx[0] = Sx[1]
	else:
		px[2] = px[1]
		Sx[2] = Sx[1]
	px[1] = (px[0] + px[2])/2
	Sx[1] = w*(S - m/px[1]) + m/px[1]

print('Max available year percent: %.2f - instead of %.2f requested' % (px[1]*1200, p*1200))

if nx > n:
	Sn = w * (S - m/p) + m/p
	print('Left after %d months (%.1f years): %.2f' % (n, n/12, Sn))
else:
	Sn = (1+p)**nx * (S - m/p) + m/p
	dS = nx*m - S
	dSm = m - S/nx
	print('Overpay after %d months (%.1f years): %.2f total, %.2f monthly average, %.2f extra' % (nx, nx/12, dS, dSm, -Sn))
