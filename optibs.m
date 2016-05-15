function varargout = optibs(varargin)
% OPTIBS M-file for optibs.fig
%      OPTIBS, by itself, creates a new OPTIBS or raises the existing
%      singleton*.
%
%      H = OPTIBS returns the handle to a new OPTIBS or the handle to
%      the existing singleton*.
%
%      OPTIBS('CALLBACK',hObject,eventData,handles,...) calls the local
%      function named CALLBACK in OPTIBS.M with the given input arguments.
%
%      OPTIBS('Property','Value',...) creates a new OPTIBS or raises the
%      existing singleton*.  Starting from the left, property value pairs are
%      applied to the GUI before optibs_OpeningFcn gets called.  An
%      unrecognized property name or invalid value makes property application
%      stop.  All inputs are passed to optibs_OpeningFcn via varargin.
%
%      *See GUI Options on GUIDE's Tools menu.  Choose "GUI allows only one
%      instance to run (singleton)".
%
% See also: GUIDE, GUIDATA, GUIHANDLES

% Edit the above text to modify the response to help optibs

% Last Modified by GUIDE v2.5 16-Mar-2010 16:39:15

% Begin initialization code - DO NOT EDIT
gui_Singleton = 1;
gui_State = struct('gui_Name',       mfilename, ...
                   'gui_Singleton',  gui_Singleton, ...
                   'gui_OpeningFcn', @optibs_OpeningFcn, ...
                   'gui_OutputFcn',  @optibs_OutputFcn, ...
                   'gui_LayoutFcn',  [] , ...
                   'gui_Callback',   []);
if nargin && ischar(varargin{1})
    gui_State.gui_Callback = str2func(varargin{1});
end

if nargout
    [varargout{1:nargout}] = gui_mainfcn(gui_State, varargin{:});
else
    gui_mainfcn(gui_State, varargin{:});
end
% End initialization code - DO NOT EDIT


% --- Executes just before optibs is made visible.
function optibs_OpeningFcn(hObject, eventdata, handles, varargin)
% This function has no output args, see OutputFcn.
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
% varargin   command line arguments to optibs (see VARARGIN)

% Choose default command line output for optibs
handles.output = hObject;

% Update handles structure
guidata(hObject, handles);

% UIWAIT makes optibs wait for user response (see UIRESUME)
% uiwait(handles.figure1);


% --- Outputs from this function are returned to the command line.
function varargout = optibs_OutputFcn(hObject, eventdata, handles) 
% varargout  cell array for returning output args (see VARARGOUT);
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Get default command line output from handles structure
varargout{1} = handles.output;


function y=diagramB1(x)
        y=cos(x).^4;

% --- Executes on button press in pushbutton1.
function pushbutton1_Callback(hObject, eventdata, handles)
% hObject    handle to pushbutton1 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

 % =========================Початок=====================================
 
% Вихідні дані
clc
status=ones(1,11);

% Довжина хвилі, м
[lambda, status(1)]=str2num(get(handles.edit1,'String'));   

% Висота підвісу антени базової станції, м
[h, status(2)]=str2num(get(handles.edit2,'String'));

% Мінімальна потужність сигналу на вході приймача базової станції, Вт 
[Pr_BS, status(3)]=str2num(get(handles.edit3,'String'));

% Макс. підсилення ант. базової станції, од. 
[Gmax, status(4)]=str2num(get(handles.edit4,'String'));

% Підсилення антени мобільної станції 
[Gr_MS, status(5)]=str2num(get(handles.edit5,'String'));

% Відстань між базової станції та трьома мобільними станціями, км
r=zeros(1,3);
[r(1), status(6)]=str2num(get(handles.edit6,'String'));
[r(2), status(7)]=str2num(get(handles.edit7,'String'));
[r(3), status(8)]=str2num(get(handles.edit8,'String'));

% Вагові коефіцієнти цільової функції TF
[k1, status(9)]=str2num(get(handles.edit9,'String'));
[k2, status(10)]=str2num(get(handles.edit10,'String'));
[k3, status(11)]=str2num(get(handles.edit11,'String'));

if isempty(find(status,1))
    error('Incorrect input data.');
end

% ---------РОЗРАХУНОК-------------
Pr_BS = 10^(Pr_BS/10);
Ntf = 18;  % Кількість елементів цільової функції
L0=(4*pi*r*10^3/lambda).^2;  %  Вектор-рядок
       %  L=10*log10(L0);
  %---------------------------------------       
  % Розрахунок трьох опорних кутів для 3-ох точок у стільнику
 
 theta1=-atan(h*10^(-3)/r(1));   
 theta2=-atan(h*10^(-3)/r(2));  
 theta3=-atan(h*10^(-3)/r(3));
 
% Перерахунок з радіан у градуси
% theta1=180*theta1/pi,  theta2=180*theta2/pi,  theta3=180*theta3/pi
%=========================================================================

   % Розрахунок кутів між віссю діаграми спрямованості та направленнями на 
   % мобільної станції
  % (Кути відхилення від осьової лінії діаграми спрямованості)
 
  tarFun = zeros(1,Ntf);
  for i=1:Ntf
       theta0=-0.752+i*0.052; 
       %  theta0=-0.463+3*i*pi/90;                        
    delta1=abs(theta1-theta0);  %  del1=180*delta1/pi;
    delta2=abs(theta2-theta0);  %  del2=180*delta2/pi;
    delta3=abs(theta3-theta0);  %  del3=180*delta3/pi;
    del=[delta1 delta2 delta3];
    
% Створення вектор-рядка вхідного аргументу
    th(i)=theta0;  
    thDegree(i)=180*th(i)/pi;
             
% Розрахунок коефіцієнту спрямованої дії за потужностю
  F(1)=diagramB1(delta1);  F(2)=diagramB1(delta2);  F(3)=diagramB1(delta3);
 
%   Перше рівняння передачі, розрахунок потужності передавачів мобільних станцій
 Pt_MS(1)=Pr_BS*L0(1)./(Gmax.*F(1).*Gr_MS); %  p_tr=10*log10(Pt_MS(1));   
 Pt_MS(2)=Pr_BS*L0(2)./(Gmax.*F(2).*Gr_MS); % p_tr=10*log10(Pt_MS(2));
 Pt_MS(3)=Pr_BS*L0(3)./(Gmax.*F(3).*Gr_MS); %  p_tr=10*log10(Pt_MS(3));  

% Розрахунок цільової функції
  tarFun(i)=k1*Pt_MS(1)+k2*Pt_MS(2)+k3*Pt_MS(3);
  
  end
  
x = get(handles.uitable1,'Data');
sz = size(x);
if sz(1) == 0
    x=[];
end
lastStrInTable = sz(1)+1;
x(lastStrInTable, 1) = k1;
x(lastStrInTable, 2) = k2;
x(lastStrInTable, 3) = k3;
[mtf, i] = min(tarFun);
x(lastStrInTable, 4) = thDegree(i);
set(handles.uitable1,'Data',x);

semilogy(thDegree,tarFun,'k-','LineWidth',2.5);
grid on
xlabel('\theta_0, degree','FontSize',10)
ylabel('TF({\theta_0}), w','FontSize',10)
hold on
axis([-40 10 0.01 2.5]);


% --- Executes on button press in pushbutton4.
function pushbutton4_Callback(hObject, eventdata, handles)
% hObject    handle to pushbutton4 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
set(handles.uitable1,'Data',[]);
cla


% --- Executes during object creation, after setting all properties.
function figure1_CreateFcn(hObject, eventdata, handles)
% hObject    handle to figure1 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called
axes(handles.axes1);
