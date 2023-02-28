import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private router: Router) {}
  passwordsAreSame: boolean | undefined;
  accountCreated = false;
  email: string = '';

  onSignup(formRef: NgForm) {
    const pass1 = formRef.value.password;
    const pass2 = formRef.value.password2;
    if (pass1 === pass2) {
      console.log(formRef.value);
      this.passwordsAreSame = true;
      this.accountCreated = true;
      this.email = formRef.value.email;
      formRef.reset();
    } else {
      this.passwordsAreSame = false;
    }
  }
}
