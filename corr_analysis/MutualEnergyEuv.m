% Вычисление взаимной энергии Euv сигналов u(t) и v(t)
%------------------------------------------------

% Введём обозначение:  x = omega*T
syms U T x
Au = U*T * sin(x/2)./(x/2) * cos(x/2);
Bu = U*T * sin(x/2)./(x/2) * sin(x/2);
Av = U*T * ((cos(x)-1)./x.^2 + sin(x)./x);
Bv = U*T * (sin(x)./x.^2 - cos(x)./x);
ReW = Au.*Av + Bu.*Bv;
P  = sym(ReW);
PC = collect(P);
pretty(PC);
Euv = 1/(pi*T) * int(PC, x, 0, inf)