import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  ingredientList: Ingredient[] = [];
  constructor() {}

  deleteIngredient(event: any) {
    const arrayIndex = event.target.parentElement.children[0].id;
    this.ingredientList.splice(arrayIndex, 1);
  }
  addIngredient(
    ingName: string,
    ingAmt1: number,
    ingAmt2: number,
    ingAmt3: number
  ) {
    if (
      ingName !== '' &&
      ingAmt1 > 0 &&
      ingAmt2 > 0 &&
      ingAmt3 > 0 &&
      ingAmt2 < ingAmt3
    ) {
      const fraction = ingAmt1 + ' ' + ingAmt2 + '/' + ingAmt3;
      this.ingredientList.push(
        new Ingredient(ingName, fraction, this.ingredientList.length + 1)
      );
    } else if (
      ingName !== '' &&
      ingAmt1 === 0 &&
      ingAmt2 > 0 &&
      ingAmt3 > 0 &&
      ingAmt2 < ingAmt3
    ) {
      const fraction = ingAmt2 + '/' + ingAmt3;
      this.ingredientList.push(
        new Ingredient(ingName, fraction, this.ingredientList.length + 1)
      );
    } else if (
      ingName !== '' &&
      ingAmt1 > 0 &&
      ingAmt2 === 0 &&
      ingAmt3 === 0
    ) {
      this.ingredientList.push(
        new Ingredient(ingName, `${ingAmt1}`, this.ingredientList.length + 1)
      );
    }
  }
  getIngredients() {
    return this.ingredientList.slice();
  }
}
