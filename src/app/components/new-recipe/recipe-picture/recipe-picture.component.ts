import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-picture',
  templateUrl: './recipe-picture.component.html',
  styleUrls: ['./recipe-picture.component.css'],
})
export class RecipePictureComponent {
  constructor(private router: Router) {}
  fileName = '';
  changeImg = false;
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
  onNext() {
    this.router.navigate(['new-recipe', 'brief-description']);
  }
}
