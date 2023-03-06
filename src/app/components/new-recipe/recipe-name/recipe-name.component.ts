import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { RecipeService } from 'src/app/services/recipe.service';
@Component({
  selector: 'app-recipe-name',
  templateUrl: './recipe-name.component.html',
  styleUrls: ['./recipe-name.component.css'],
})
export class RecipeNameComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private recipeService: RecipeService) {}
  onSlideOut!: boolean;
  onSlideIn!: boolean;
  onBack() {
    this.router.navigate(['new-recipe']);
  }
  onNext(formRef: NgForm) {
    this.onSlideOut = true;
    setTimeout(
      () => this.router.navigate(['new-recipe', 'recipe-picture']),
      500
    );
    this.recipeService.addRecipeName(formRef.value.recipeName);
  }
  ngOnInit(): void {
    this.onSlideOut = false;
    this.onSlideIn = true;
  }
  ngOnDestroy(): void {
    this.onSlideOut = false;
    this.onSlideIn = false;
  }
}
