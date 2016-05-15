% Символьное интегрирование и упрощение
% полученного выражения
% T/2 < tau < T

syms U T tau t

C1 = int((U+2*U*(t-tau)/T)*(U-2*U*t/T), tau-T/2, T/2);

p = sym(C1);
pc = collect(p);
pretty(pc);
