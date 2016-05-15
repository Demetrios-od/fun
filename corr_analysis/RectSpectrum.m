% Графики функций A(w), B(w) и модуля S(w)
%-------------------------------------------
figure(1)
x = [-25:0.001:25];
y = sin(x)./x;

subplot(3,1,1)
plot(x,y,'r-','LineWidth',2)
set(gca, 'GridLineStyle', '-')
grid on
axis ([-25 25 -0.3 1.2])
set(gca, 'FontName', 'Standard Symbols L')
set(gca, 'XTick', (-8*pi:2*pi:8*pi),...
    'XTickLabel', '-8p|-6p|-4p|-2p|0|2p|4p|6p|8p', 'FontSize', 12)
%-------------------------------------------
y = sin(x/2)./(x/2).*sin(x/2);
subplot(3,1,2)
plot(x,y,'b-','LineWidth',2)
set(gca, 'GridLineStyle', '-')
grid on
axis ([-25 25 -1 1])
set(gca, 'FontName', 'Standard Symbols L')
set(gca, 'XTick', (-8*pi:2*pi:8*pi),...
    'XTickLabel', '-8p|-6p|-4p|-2p|0|2p|4p|6p|8p', 'FontSize', 12)
%-------------------------------------------
y = abs(sin(x/2)./(x/2));
subplot(3,1,3)
plot(x,y,'b-','LineWidth',2)
set(gca, 'GridLineStyle', '-')
grid on
axis ([-25 25 -0.2 1.2])
set(gca, 'FontName', 'Standard Symbols L')
set(gca, 'XTick', (-8*pi:2*pi:8*pi),...
    'XTickLabel', '-8p|-6p|-4p|-2p|0|2p|4p|6p|8p', 'FontSize', 12)
