% Автокорреляционная функция апериодической
% М-последовательности с N = 15
figure('Color', 'w');
clear all

M = [1 1 1 1 -1 1 -1 1 1 -1 -1 1 -1 -1 -1];
N = length(M);

for m=1:N
    s = 0;
    for n=(m+1):N
        s = s + M(n) * M(n-m);
        R(m) = s;
    end
end
m1 = 0:N;
y = [N R 0];
plot(m1, y, 'k-', 'LineWidth', 3)
set(gca, 'GridLines', '-')
grid on
axis([0 17 -5 16])
%--------------------------------------------------
% горизонтальная ось
line([0 16], [0 0], 'LineWidth', 1, 'Color', 'k')