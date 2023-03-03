import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { RecipeService } from 'src/app/services/recipe.service';
@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent implements OnInit, OnDestroy {
  constructor(private recipeService: RecipeService, private router: Router) {}
  ingredientsList: Ingredient[] = [];
  onSlideOut!: boolean;
  @ViewChild('formRef') formRef!: NgForm;

  resetIngredientInputs() {
    const formRefVal = this.formRef.controls;
    formRefVal['ingName'].reset();
    formRefVal['numInput1'].reset();
    formRefVal['numInput2'].reset();
    formRefVal['numInput3'].reset();
  }

  onAddIngredient(
    ingName: string,
    ingAmt1: number,
    ingAmt2: number,
    ingAmt3: number
  ) {
    this.recipeService.addIngredient(ingName, ingAmt1, ingAmt2, ingAmt3);
    this.ingredientsList = this.recipeService.getIngredients();
    this.resetIngredientInputs();
  }
  onIngredientDelete(event: any) {
    this.recipeService.deleteIngredient(event);
    this.ingredientsList = this.recipeService.getIngredients();
  }

  onBack() {
    this.router.navigate(['new-recipe', 'brief-description']);
  }
  onNext(formRef: NgForm) {
    this.onSlideOut = true;
    setTimeout(
      () => this.router.navigate(['new-recipe', 'instructions']),
      1000
    );
  }
  ngOnInit() {
    this.ingredientsList = this.recipeService.getIngredients();
    this.onSlideOut = false;
  }
  ngOnDestroy(): void {
    this.onSlideOut = false;
  }
}
