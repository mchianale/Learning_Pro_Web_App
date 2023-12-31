// login.component.ts
import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loginService.login(this.email, this.password)
      .subscribe(
        (response: any) => {
          // Assuming the backend returns a token upon successful login
          const token = response.token;

          // You can now handle the token as needed (e.g., store it in local storage)

          this.authService.setAuthToken(token);
          // Redirect to private home
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }

  GoToSignUp() {
    this.router.navigate(['register']);
  }
}

