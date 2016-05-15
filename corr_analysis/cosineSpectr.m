% Графическое изображение сигнала в виде полупериода косинусоиды
% и его спектра
figure('Color', 'w')
hold on
% hAx = axes('Position', [0.1 0.2 0.8 0.2])

T = 1;
t = [-0.5:0.001:0.5];
y = cos(pi*t/T);

subplot(2,2,1)
plot(t, y, 'b-', 'LineWidth', 2)
grid on
axis([-1 1 0 1])
% set(gca, 'Visible', 'off')
%----------------------------------------------

x2 = [-37.7:0.01:37.7];
y2 = (2/pi)*abs(cos(x2/2)./(1-(x2/pi).^2));
subplot(2,2,2)
plot(x2, y2, 'b-', 'LineWidth', 2)
grid on
axis([-37.7 37.7 0 1])
% set(gca, 'Visible', 'off')