import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';
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
  currentUserData!: UserData;

  onLogin(formRef: NgForm) {
    this.authService
      .loginUser(formRef.value.email, formRef.value.password)
      .subscribe({
        next: (resData) => {
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
