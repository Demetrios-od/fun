% Символьное интегрирование и упрощение
% полученного выражения
% 0 < tau < T/2

syms U T tau t

A = int((U+2*U*t/T)*(U+2*U*(t-tau)/T), (tau - T/2), 0);
B = int((U+2*U*(t-tau)/T)*(U-2*U*t/T), 0, tau);
C = int((U-2*U*t/T)*(U-2*U*(t-tau)/T), tau, T/2);
Ks = A+B+C;

p = sym(Ks);
pc = collect(p);
pretty(pc);