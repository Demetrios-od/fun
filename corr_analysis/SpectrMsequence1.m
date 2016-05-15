% Вычисление спектра апериодической М-последовательности
figure('Color', 'w')
clear all

a = [1 1 1 1 1 -1 -1 1 1 -1 1 -1 1];
N = length(a);
% Введём обозначение: x = omega*tau_0
x = [-2*pi:pi/100:2*pi];

A = zeros(1,length(x));
B = A;
% A и B – векторы, состоящие из нулей;
% их длина такая же, как и длина вектора x

for i=1:N
    A = A + a(i)*cos((i-1)*x);
    B = B + a(i)*sin((i-1)*x);
end
H = sqrt(A.^2 + B.^2);

S1 = abs(sin(x/2)./(x/2));
S = S1.*H;

plot(x, S, 'k-', 'LineWidth', 3)
grid on
hold on
x1 = [-8:0.01:8];
S1 = abs(sin(x1/2)./(x1/2));
plot(x1, S1, 'k--', 'LineWidth', 2)

set(gca, 'GridLines', '-')
axis([-8 8 0 6])
%---------------------------------------------------

% Горизонтальная ось
line([-8 8], [0 0], 'LineWidth', 2, 'Color', 'k')
