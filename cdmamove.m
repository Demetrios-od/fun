function cdmamove(K0, SF)
    %SF = 32;
    BSx = [0 0 1  1  0 -1 -1];
    BSy = [0 1 0 -1 -1  0  1];
    NBS = length(BSx);
    K = K0*ones(1,NBS);
    n = 4;
    x = -1/3:0.01:2/3;
    r0 = dist(x,yfn(x),0,0);
    
    summa = 0;
    for i=1:NBS
        ri = dist(x,yfn(x),BSx(i),BSy(i));
        summa = summa + K(i)*(r0./ri).^n;
    end
    ro = 10*log10(SF./(summa - 1));
    plot(x,ro)
    grid on
    hold on
end

function y=yfn(x)
    y = -x + 1/3;
end

function d = dist(x1,y1,x2,y2)
    d = sqrt((x2-x1).^2 + (x2-x1).*(y2-y1) + (y2-y1).^2);
end
