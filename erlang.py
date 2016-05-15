#!/usr/bin/python
from __future__ import division
import math
import sys

def ExtToComplexReal(x):
  f_base = x
  f_exp = 0
  p = math.trunc(math.log10(f_base))
  if f_base < 1:
    p -= 1
  if p != 0:
    f_base = f_base / (10**p)
    f_exp = f_exp + p
  return (f_base, f_exp)


def Multiply(x1,x2):
  ybcr = ExtToComplexReal(x1[0] * x2[0])
  y_exp = x1[1] + x2[1] + ybcr[1]
  return (ybcr[0], y_exp)


def Divide(x1,x2):
  ybcr = ExtToComplexReal(x1[0] / x2[0])
  y_exp = x1[1] - x2[1] + ybcr[1]
  return (ybcr[0], y_exp)


def Summa(x1,x2):
  if x2[1] > x1[1]:
    xbuf = x2
    x2 = x1
    x1 = xbuf
  ybcr = ExtToComplexReal(x1[0] + x2[0]*(10**(x2[1]-x1[1])))
  y_exp = x1[1] + ybcr[1]
  return (ybcr[0], y_exp)


def Fact(x):
  y = (1,0)
  if (x!=1) and (x>=0):
    i=2
    while i<=x:
      y = Multiply(y, ExtToComplexReal(i))
      i += 1
  return y


def PowerNat(base,ex):
  ybcr = ExtToComplexReal(base[0]**ex)
  y_exp = base[1]*ex + ybcr[1]
  return (ybcr[0], y_exp)


def Probab(N,Y):
  def yn_nf(y,n):
    return Divide(PowerNat(ExtToComplexReal(y),n),Fact(n))
  chisl = yn_nf(Y,N)
  znamen = (1,0)
  k=0
  while k<=N:
    znamen = Summa(znamen,yn_nf(Y,k))
    k += 1
  chisl = Divide(chisl,znamen)
  return chisl[0]*(10**chisl[1])


validargs = ("-n","-y","-p")
if sys.argv[1] in validargs and sys.argv[3] in validargs and (
sys.argv[1]!=sys.argv[3]):
  a = {sys.argv[1]: sys.argv[2], sys.argv[3]: sys.argv[4]}
  N = int(a['-n']) if '-n' in a else 0
  Y = float(a['-y']) if '-y' in a else 0
  P = float(a['-p'])/100 if '-p' in a else 0
  if (N,Y,P).count(0) == 1:
    if N == 0:
      while Probab(N,Y)>P:
        N += 1
      print("Number of channels: " + str(N))
    elif Y == 0:
      eps = 1e-5
      Y = 0.001
      Yh = 5
      while (P-Probab(N,Y))>eps:
        while (P-Probab(N,Y))>eps:
          Y += Yh
        Y -= Yh
        Yh = Yh/5
        if Yh < eps:
          break
      print("Phone load: " + str(Y) + " Erl")
    elif P == 0:
      print("Probability of call loss: " + str(Probab(N,Y)*100) + " %")
  else:
    print("You must set two values different from zero.")
else:
  print("Invalid arguments.")

