import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private authService: AuthenticateService,
    private dataService: DataStorageService
  ) {}
  passwordsAreSame!: boolean;
  accountCreated = false;
  errorMessage!: any;

  onSignup(formRef: NgForm) {
    const pass1 = formRef.value.password;
    const pass2 = formRef.value.password2;
    if (pass1 === pass2 && formRef.valid) {
      this.passwordsAreSame = true;
      const newUser = {
        email: formRef.value.email,
        firstName: formRef.value.firstName,
        lastName: formRef.value.lastName,
        password: formRef.value.password,
        securityQuestion: formRef.value.securityQuestion,
        securityAnswer: formRef.value.securityAnswer,
      };

      this.authService.authorizeUser(newUser).subscribe({
        next: (resData) => {
          this.accountCreated = true;
          this.dataService.postUserData(newUser);
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
