import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private authService: AuthenticateService
  ) {}
  passwordsAreSame!: boolean;
  accountCreated = false;
  errorMessage!: any;

  onSignup(formRef: NgForm) {
    const pass1 = formRef.value.password;
    const pass2 = formRef.value.password2;
    if (pass1 === pass2 && formRef.valid) {
      this.passwordsAreSame = true;

      this.authService
        .signupUser(
          new UserData(
            formRef.value.email,
            formRef.value.firstName,
            formRef.value.lastName,
            formRef.value.password,
            formRef.value.securityQuestion,
            formRef.value.securityAnswer
          )
        )
        .subscribe({
          next: (resData) => {
            console.log(resData);
            this.accountCreated = true;
          },
          error: (errorData) => {
            console.log(errorData);
            this.errorMessage = errorData.error.error.message;
          },
        });

      formRef.reset();
    } else {
      this.passwordsAreSame = false;
    }
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.accountCreated = false;
    this.errorMessage = null;
  }
}
