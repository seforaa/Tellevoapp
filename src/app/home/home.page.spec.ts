import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../service/auth.service';
import { NavController } from '@ionic/angular';


describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;
  let component: HomePage;
  let authService: AuthService;
  let navController: NavController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, NavController],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    navController = TestBed.inject(NavController);


    component.state = { credentials: { username: 'testuser' }, tipo_user: 'test' };
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
