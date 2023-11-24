import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ViajePage } from './viaje.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViajePage', () => {
  let fixture: ComponentFixture<ViajePage>;
  let component: ViajePage;
  let authService: AuthService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViajePage],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(ViajePage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe establecer vacio en verdadero si algún campo obligatorio está vacío', () => {
    component.viaje = {
      patente: '',
      duenno: '',
      destino: '',
      salida: '',
      capacidad: 0,
      precio: 0,
    };

    component.guardarViaje();

    expect(component.vacio).toBeTruthy();
  });

});