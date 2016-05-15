% Демонстрация принципа сжатия спектра
clear
clf
set(gcf, 'Color', 'w')
hold on

% загружаем ранее сохранённые переменные: x sprseq yfin lb
load cdmadata

plot(x, yfin+12, 'k-')

seq = repmat(sprseq, 1, lb);
y1 = psp(bit2lv(seq), x);
plot(x, y1+9, 'k-')

y2 = yfin.*y1;
plot(x, y2+6, 'k-')

xmin = x(1);
xmax = x(end);
width = (xmax-xmin)/length(seq);
y3 = sin(2*pi*x/width);
plot(x, y3+3, 'k-')

y4 = y2./y3;
plot(x, y4, 'k-')

for i = 12:-3:0
    line([xmin xmax], [i i], 'Color', 'b')
end
w1 = (xmax-xmin)/lb;
for i = w1:w1:x(end)-w1
    line([i i], [-2 14], 'Color', 'r')
end