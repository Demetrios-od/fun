x=[0:0.05:1];
y=[0:0.05:1];
for i=1:length(x)
    for j=1:length(y)
        z(i,j)=sqrt((x(i)-0.5).^2 + (y(j)-0.2).^2).^1.3;
    end;
end;
surf(x,y,z)

