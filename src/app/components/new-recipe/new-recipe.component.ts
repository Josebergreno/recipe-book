import { Component, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../models/ingredient.model';
import { OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit {
  ingredientsList: Ingredient[] = [new Ingredient('chicken', '1 3/4')];

  constructor(recipeService: RecipeService) {}

  onSubmit(formRef: NgForm) {
    console.log();
  }
  onAddIngredient(
    ingName: string,
    ingAmt1: number,
    ingAmt2: number,
    ingAmt3: number
  ) {
    // if there is a fractional amount
    if (
      ingName !== '' &&
      ingAmt1 > 0 &&
      ingAmt2 > 0 &&
      ingAmt3 > 0 &&
      ingAmt2 < ingAmt3
    ) {
      const fraction = ingAmt1 + ' ' + ingAmt2 + '/' + ingAmt3;
      this.ingredientsList.push(new Ingredient(ingName, fraction));
    } else if (
      ingName !== '' &&
      ingAmt1 === 0 &&
      ingAmt2 > 0 &&
      ingAmt3 > 0 &&
      ingAmt2 < ingAmt3
    ) {
      const fraction = ingAmt2 + '/' + ingAmt3;
      this.ingredientsList.push(new Ingredient(ingName, fraction));
    } else if (ingName !== '' && ingAmt1 > 0 && ingAmt2 === 0 && ingAmt3 === 0)
      this.ingredientsList.push(new Ingredient(ingName, `${ingAmt1}`));
  }
  ngOnInit() {}
}
