% М-последовательность с N=15r
% Автокорреляционная функция
      hF=figure('Color','w');
    % hAx=axes1(hF);
%-----------------------------------------------------
  % Построение М-последовательности
  hold on
  line([-15 -11],[1.6 1.6],'LineWidth',3,'Color','r');% Гор.лин. 
  line([-10 -9],[1.6 1.6],'LineWidth',3,'Color','r');
  line([-8 -6],[1.6 1.6],'LineWidth',3,'Color','r');
  line([-4 -3],[1.6 1.6],'LineWidth',3,'Color','r');
        line([-11 -10],[1.2 1.2],'LineWidth',3,'Color','r');
        line([-9 -8],[1.2 1.2],'LineWidth',3,'Color','r');
        line([-6 -4],[1.2 1.2],'LineWidth',3,'Color','r');
        line([-3 0],[1.2 1.2],'LineWidth',3,'Color','r');
 line([-16 3],[1.4 1.4],'LineWidth',2,'Color','k');  % Ось
 %----------------------------------------------------------
    line([-15 -15],[1.6 1.4],'LineWidth',3,'Color','r');
    line([-11 -11],[1.6 1.2],'LineWidth',3,'Color','r');
      line([-10 -10],[1.6 1.2],'LineWidth',3,'Color','r');
        line([-9 -9],[1.6 1.2],'LineWidth',3,'Color','r');
          line([-8 -8],[1.6 1.2],'LineWidth',3,'Color','r');
            line([-6 -6],[1.6 1.2],'LineWidth',3,'Color','r');
              line([-4 -4],[1.6 1.2],'LineWidth',3,'Color','r');
                line([-3 -3],[1.6 1.2],'LineWidth',3,'Color','r');
                  line([-0 -0],[1.4 1.2],'LineWidth',3,'Color','r');
                  line([-0 -0],[1.2 -0.4],'LineWidth',1.8,'Color','k');
%=====================================================
 m2=-15:15; 
  ACF=[0 -0.0667 -0.1333 -0.2 -0.1333 -0.0667 -0.1333 ... 
      0.0667 -0.1333 0.0667 0 0.0667 0.1333 0.0667 0 1 ...
      0 0.0667 0.1333 0.0667 0 0.0667 -0.1333 0.0667 ...
      -0.1333 -0.0667 -0.1333 -0.2 -0.1333 -0.0667 0]; 
    plot(m2,ACF,'b-','LineWidth',2.5)
    hold on
    grid on
  axis([-20 20 -0.4 1.7]) 
%----------------------------------------- 
line([-15 17],[0 0],'LineWidth',2,'Color','k');% Гор. ось
line([-15 -15],[-0.4 1.4],'LineWidth',2,'Color','k');% Верт. ось
  line([-15 15],[-0.2 -0.2],'LineWidth',1.5,'LineStyle','--','Color','k');
   set(gca,'Box','off')
  set(gca,'XGrid','on')
   set(gca,'GridLineStyle','--')
   set(gca,'LineWidth',[3])
%===================================================== 
         set(gca,'Color','y')  % Заливка фона желтизной
       %  set(gca,'Visible','off')
          
          
          