import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-picture',
  templateUrl: './recipe-picture.component.html',
  styleUrls: ['./recipe-picture.component.css'],
})
export class RecipePictureComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}
  fileName = '';
  changeImg = false;
  onSlideOut!: boolean;
  onSlideIn!: boolean;
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

  onBack() {
    this.router.navigate(['new-recipe', 'recipe-name']);
  }
  onNext(formRef: NgForm) {
    this.onSlideOut = true;
    this.onSlideIn = false;
    setTimeout(
      () => this.router.navigate(['new-recipe', 'brief-description']),
      1000
    );
  }

  ngOnInit(): void {
    this.onSlideOut = false;
    setTimeout(() => {
      this.onSlideIn = true;
    }, 1);
  }
  ngOnDestroy(): void {
    this.onSlideOut = false;
    this.onSlideIn = false;
  }
}
