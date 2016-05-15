function FX = myidft(x)
  % Обратное дискретное преобразование Фурье
  N = length(x);
  FX = zeros(1,N);   % Спектр - пока что пустой массив
  W = exp(i*2*pi/N);
  for k=1:N
    for n=1:N
      FX(k) = FX(k) + x(n)*W^((n-1)*(k-1));
    end
    FX(k) = FX(k)/N;
  end
