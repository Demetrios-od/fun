% Прямое расширение энергетического спектра битового потока
clear
clf
set(gcf, 'Color', 'w')
hold on

bits = [1 0 1 0];
sprseq = [0 1 1 0 1 0 0];
x = 0:0.1:100;

y1 = psp(bit2lv(bits), x);
plot(x, y1+12, 'k-')

lb = length(bits);
seq = repmat(sprseq, 1, lb);
y2 = psp(bit2lv(seq), x);
plot(x, y2+9, 'k-')

y3 = y1.*y2;
plot(x, y3+6, 'k-')

xmin = x(1);
xmax = x(end);
width = (xmax-xmin)/length(seq);
y4 = sin(2*pi*x/width);
plot(x, y4+3, 'k-')

yfin = y3.*y4;
plot(x, yfin, 'k-')

save 'cdmadata.mat' x sprseq yfin lb

for i = 12:-3:0
    line([xmin xmax], [i i], 'Color', 'b')
end
w1 = (xmax-xmin)/lb;
for i = w1:w1:x(end)-w1
    line([i i], [-2 14], 'Color', 'r')
end