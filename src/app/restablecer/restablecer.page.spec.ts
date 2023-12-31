import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestablecerPage } from './restablecer.page';

describe('RestablecerPage', () => {
  let component: RestablecerPage;
  let fixture: ComponentFixture<RestablecerPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(RestablecerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('debe mostrar "Restablecer contraseña" en el HTML', () => {
    fixture.detectChanges();
    const h1Element = fixture.nativeElement.querySelector('h1');
    expect(h1Element).toBeTruthy();
    expect(h1Element.textContent).toContain('Restablecer contraseña');
  });

  it('debería establecer un mensaje de error si el nombre de usuario está vacío al restablecer', () => {
    component.username = '';
    component.error = false;
    fixture.detectChanges();

    // Simula el clic en el botón de restablecer
    const restablecerButton = fixture.nativeElement.querySelector('#present-alert');
    restablecerButton.click();
    fixture.detectChanges();

    expect(component.error).toBeTruthy();

  });

  it('no debería establecer un mensaje de error si el nombre de usuario no está vacío al restablecer', () => {
    component.username = 'testuser';
    component.error = false;
    fixture.detectChanges();

    // Simula el clic en el botón de restablecer
    const restablecerButton = fixture.nativeElement.querySelector('#present-alert');
    restablecerButton.click();
    fixture.detectChanges();

    expect(component.error).toBeFalsy();

  });
});