clf
hold on
x = 0:0.01:12;
for k=0:9
  plot(x,besselj(k,x));
end
grid on
