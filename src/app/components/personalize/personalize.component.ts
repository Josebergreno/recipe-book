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
  imgSrc = '/assets/placeHolderImg.webp';
  selectedImg: any = null;

  constructor() {}

  onNameChange() {
    this.changeName = true;
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => (this.imgSrc = event.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      this.imgSrc = '/assets/placeHolderImg.webp';
      this.selectedImg = null;
    }
  }

  onSubmit(formRef: NgForm) {
    console.log(formRef.controls);
  }
}
