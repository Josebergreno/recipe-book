import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-picture',
  templateUrl: './recipe-picture.component.html',
  styleUrls: ['./recipe-picture.component.css'],
})
export class RecipePictureComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private recipeService: RecipeService) {}
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

  onBack(formRef: NgForm) {
    this.router.navigate(['new-recipe', 'recipe-name']);
    console.log(formRef.controls);
  }
  onNext(formRef: NgForm) {
    this.onSlideOut = true;
    this.onSlideIn = false;
    setTimeout(
      () => this.router.navigate(['new-recipe', 'brief-description']),
      1000
    );
    this.recipeService.addRecipePic(formRef.value.imgFile);
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
