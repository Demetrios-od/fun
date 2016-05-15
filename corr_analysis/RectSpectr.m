% Графики прямоугольного импульса и его амплитудного спектра
clear
figure('Color', 'w')
hold on
% hAx = axes('Position', [0.1 0.2 0.8 0.2]);

x = [-1:0.001:1];
subplot(1,2,1)
x0 = [-0.5 0.5];
y0 = [0.5 0.5];
line(x0, y0, 'LineWidth', 3.1, 'Color', 'r');
grid on
axis([-1 1 0.1 1])
% set(gca, 'Visible', 'off')
%----------------------------------------------

x2 = [-25.2:0.001:25.2];
y2 = abs(sin(x2/2)./(x2/2));
subplot(1,2,2)
plot(x2, y2, 'b-', 'LineWidth', 2)
grid on
axis([-25.2 25.2 0 1])
% set(gca, 'Visible', 'off')