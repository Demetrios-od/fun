% Модуль спектральной плотности пачки из n импульсов
%----------------------------------------------------------
clear
figure('Color', 'w')
hold on

% Исходные данные
n = 4;
T = 1;
T1 = 2;
x = [-12.566:0.01:12.566];

% Спектр одного импульса
S1 = abs(sin(x/2)./(x/2));
% Функция R(n,x)
Rn = abs( sin(n*x*T1/T/2) ./ sin(x*T1/T/2) );
S = S1.*Rn;

% Первые координатные оси
subplot(3,1,1)
plot(x, S1, 'r--', 'LineWidth', 2.5)
grid on
set(gca, 'XTick', [-2*pi, -pi, 0 pi, 2*pi])
axis([-12.566 12.566 0 1.5])
set(gca, 'GridLines', '-')
set(gca, 'XTickLabel', [])

% Вторые координатные оси
subplot(3,1,2)
plot(x, Rn, 'b-', 'LineWidth', 1.5)
grid on
set(gca, 'XTick', [-3*pi, -2*pi, -pi, 0 pi, 2*pi, 3*pi])
axis([-12.566 12.566 0 5])
set(gca, 'GridLines', '-')
set(gca, 'XTickLabel', [])

% Третьи координатные оси
subplot(3,1,3)
plot(x, S, 'k-', 'LineWidth', 2.5)
grid on
hold on
plot(x, S1, 'r--', 'LineWidth', 2.5)
set(gca, 'XTick', [-3*pi, -2*pi, -pi, 0 pi, 2*pi, 3*pi])
set(gca, 'GridLines', '-')
set(gca, 'XTickLabel', [])
axis([-12.566 12.566 0 5])