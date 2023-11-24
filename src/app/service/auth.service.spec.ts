import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('debería simular getUsuarios', () => {
    // Aquí estamos simulando el método getUsuarios para devolver un observable vacío
    spyOn(authService, 'getUsuarios').and.returnValue(of([]));

    // Ahora puedes llamar al método getUsuarios en tu prueba y se simulará
    authService.getUsuarios().subscribe(response => {
      // response debe ser un array vacío, ya que hemos simulado el servicio
      expect(response).toEqual([]);
    });
  });
});

