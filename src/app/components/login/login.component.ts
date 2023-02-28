import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loggedIn = false;

  onLogin(formRef: NgForm) {
    console.log(formRef.value);
  }
}
