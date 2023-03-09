import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}
  loggedIn = false;
  errorMessage!: string;

  onLogin(formRef: NgForm) {
    this.authService.getUser();
    this.authService
      .loginUser(formRef.value.email, formRef.value.password)
      .subscribe({
        next: (resData) => {
          console.log(resData);
          this.loggedIn = true;
          this.router.navigate(['browse-recipes']);
        },
        error: (errorData) => {
          console.error(errorData);
          this.errorMessage = errorData.error.error.message;
        },
      });
  }
}
