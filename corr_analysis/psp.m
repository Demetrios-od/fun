function y = psp(bits, x)
    % bits - последовательность битов
    % x - значения по оси X
    
    width = (x(end)-x(1))/length(bits);
    y = zeros(1, length(x));
    for i=1:length(bits)
        y = y + bits(i) * rectpuls(x-x(1)-width*(i-0.5), width);
    end
end