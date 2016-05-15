% Построение графиков функций Av, Bv и модуля спектральной плотности
% треугольного импульса v(t)
%------------------------------------------------
clear all
figure('Color', 'w');
hold on

% Введём обозначение:  x = omega*T
x = -20:0.1:20;

Av = (cos(x)-1)./x.^2 + sin(x)./x;
plot(x, Av, 'r-', 'LineWidth', 1.7)
Bv = sin(x)./x.^2 - cos(x)./x;
plot(x, Bv, 'b--', 'LineWidth', 1.7)
V = sqrt(Av.^2 + Bv.^2);
plot(x, V, 'k-', 'LineWidth', 2.3)

axis([-20 20 -0.6 0.8])
% Горизонтальная ось
line([-20 20], [0 0], 'LineWidth', 2, 'Color', 'k');
% Вертикальная ось
line([0 0], [-0.2 0.7], 'LineWidth', 2, 'Color', 'k');
set(gca, 'Visible', 'off')