import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css'],
})
export class PersonalizeComponent {
  changeName = false;
  changeImg = false;
  fileName = '';

  constructor(private http: HttpClient) {}

  onNameChange() {
    this.changeName = true;
  }
  onFileSelected(event: any) {
    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.fileName = event.target.result;
      };

      this.changeImg = true;
    }
  }

  onPersonalize(formRef: NgForm) {
    console.log(formRef.value);
    this.fileName = formRef.value.imgFile;
  }
}
