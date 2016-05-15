% Графики треугольного импульса и его амплитудного спектра
figure('Color', 'w')
hold on

% hAx = axes('Position', [0.1 0.2 0.8 0.2]);
x = [-1:0.001:1];
subplot(1,2,1)

x0 = [-0.5 0];
y0 = [0 0.5];
line(x0, y0, 'LineWidth', 3.1, 'Color', 'r');

x1 = [0 0.5];
y1 = [0.5 0];
line(x1, y1, 'LineWidth', 3.1, 'Color', 'b');

grid on
axis([-1 1 0 1])
% set(gca, 'Visible', 'off')
%------------------------------------------

x2 = [-37.7:0.001:37.7];
y2 = 0.5*(sin(x2/4)./(x2/4)).^2;
subplot(1,2,2)
plot(x2, y2, 'b-', 'LineWidth', 2)
grid on
axis([-37.7 37.7 0 0.8])
% set(gca, 'Visible', 'off')
