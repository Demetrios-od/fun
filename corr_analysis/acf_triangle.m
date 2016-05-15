% Построение автокорреляционной функции треугольного импульса
subplot(2,1,1)
line([-4 0], [0 3], 'LineWidth', 3, 'Color', 'k');
line([0 4], [3 0], 'LineWidth', 3, 'Color', 'k');
axis([-10 10 0 5])
set(gca, 'XTickLabel', [], 'YTickLabel', [])

%-----------------------------------------------------------
subplot(2,1,2)
U = 1;
T = 8;

tau1 = [0:0.1:T/2];
Ks1 = U^2*T/3 *(1 + 6*tau1.^3/T^3 - 6*tau1.^2/T^2);

tau2 = [T/2:0.1:T];
Ks2 = 2*U^2*T/3 *(1 - tau2.^3/T^3 + 3*tau2.^2/T^2 - 3*tau2/T);

% Конкатенация (сцепление) векторов-строк
tau = [tau1 tau2];
Ks = [Ks1 Ks2];

plot(-tau, Ks, 'k-', 'LineWidth', 2.5)
hold on
plot(tau, Ks, 'k-', 'LineWidth', 2.5)
axis([-10 10 0 5])
set(gca, 'XTickLabel', [], 'YTickLabel', [])

%---------------------------------------------------------
x_mark = [-4 4];
y_mark = [2/3 2/3];
plot(x_mark, y_mark, 'k.', 'Marker', 'o', ...
    'MarkerSize', 5, 'MarkerFaceColor', 'k')
