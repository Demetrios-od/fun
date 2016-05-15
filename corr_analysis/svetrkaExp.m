% Вычисление свёртки двух функций и построение графиков
clear
figure('Color', 'w')

% Первые координатные оси
subplot (1,3,1)
a1 = 2;
t = [0:0.01:2];
h = exp(-a1*t);
plot(t, h, 'r--', 'LineWidth', 2.5)
grid on
set(gca, 'GridLines', '-')
% set(gca, 'XTickLabel', [])

% Вторые координатные оси
subplot (1,3,2)
a2 = 6.5;
f = exp(-a2*t);
plot(t, f, 'b-', 'LineWidth', 1.5)
grid on
set(gca, 'GridLines', '-')
% set(gca, 'XTickLabel', [])

% Третьи координатные оси
subplot (1,3,3)
g = ( exp(-a1*t) - exp(-a2*t) ) / (a2 - a1);
plot(t, g, 'k-', 'LineWidth', 2.5)
grid on
set(gca, 'GridLines', '-')
% set(gca, 'XTickLabel', [])