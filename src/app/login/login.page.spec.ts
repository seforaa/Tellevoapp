import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let authService: AuthService;
  let spy:any;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule, HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);

    
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar "Iniciar sesión" en el HTML', () => {
    fixture.detectChanges();
    const h1Element = fixture.nativeElement.querySelector('h1');
    expect(h1Element).toBeTruthy();
    expect(h1Element.textContent).toContain('Login');
  });

  it('debería cargar usuarios al inicializar', fakeAsync(() => {
    const mockUsuarios = [{ user: 'testuser', password: 'testpassword', tipo_user: 'Conductor' }];
    spyOn(authService, 'getUsuarios').and.returnValue(of(mockUsuarios));
  
    fixture.detectChanges();
    tick();
  
    expect(component.usuarios).toEqual(mockUsuarios);
  }));

  it('debería cargar usuarios al llamar a cargaUsuarios', fakeAsync(() => {
    const mockUsuarios = [{ user: 'testuser', password: 'testpassword', tipo_user: 'Conductor' }];
    spyOn(authService, 'getUsuarios').and.returnValue(of(mockUsuarios));
  
    component.cargaUsuarios();
    tick();
  
    expect(component.usuarios).toEqual(mockUsuarios);
  }));
    
  it('debe establecer loginvacio en verdadero si las credenciales están vacías al entrar', () => {
    component.credentials.username = '';
    component.credentials.password = '';
    component.loginvacio = false;
    component.loginerror = false;
    component.error = false;


    component.entrar();

    expect(component.loginvacio).toBeTruthy();
    expect(component.loginerror).toBeFalsy();
    expect(component.error).toBeFalsy();
  });

  it('debe establecer loginerror en verdadero si no se encuentra ningún usuario coincidente al entrar', fakeAsync(() => {
    spyOn(authService, 'getUsuarios').and.returnValue(of([]));

    component.credentials.username = 'errortestuser';
    component.credentials.password = 'errortestpassword';
    component.tipo_user= 'Conductor';
    component.loginvacio = false;
    component.loginerror = false;
    component.error = false;

    component.entrar();
    tick();

    expect(component.loginvacio).toBeFalsy();
    expect(component.loginerror).toBeTruthy();
    expect(component.error).toBeFalsy();
  }));

  it('debe navegar al home si se encuentra un usuario coincidente al ingresar', fakeAsync(() => {
    const mockUsuarios = [{ user: 'testuser', password: 'testpassword', tipo_user: 'Conductor' }];
    
    // Configurar el servicio para devolver los usuarios de prueba
    spy = spyOn(authService, 'getUsuarios').and.returnValue(of(mockUsuarios));
    spyOn(router, 'navigate');
    // Configurar la llamada al método entrar
    component.credentials.username = 'testuser';
    component.credentials.password = 'testpassword';
    component.loginvacio = false;
    component.loginerror = false;
    component.error = false;

    // Llamar al método entrar y esperar a que se completen las operaciones asíncronas
    component.entrar();
    tick();

    // Verificar expectativas
    expect(component.loginvacio).toBeFalsy();
    expect(component.loginerror).toBeFalsy();
    expect(component.error).toBeFalsy();
    expect(authService.getUsuarios).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home'], {
      state: { credentials: component.credentials, tipo: 'Conductor' },
    });
  }));
});
