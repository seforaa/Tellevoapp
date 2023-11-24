import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ViajePage } from './viaje.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViajePage', () => {
  let fixture: ComponentFixture<ViajePage>;
  let component: ViajePage;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViajePage],
      imports: [HttpClientTestingModule], // Agrega HttpClientTestingModule aquí
    }).compileComponents();

    fixture = TestBed.createComponent(ViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
