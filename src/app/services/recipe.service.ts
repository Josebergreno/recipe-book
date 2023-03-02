import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Instruction } from '../models/instruction.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  instructionsList: Instruction[] = [];
  ingredientList: Ingredient[] = [];
  formData: FormGroup[] = [];
  constructor() {}

  deleteIngredient(event: any) {
    const arrayIndex = event.target.parentElement.children[0].id;
    this.ingredientList.splice(arrayIndex, 1);
  }
  deleteInstruction(event: any) {
    const arrayIndex = event.target.parentElement.children[0].id;
    this.instructionsList.splice(arrayIndex, 1);
  }
  addInstruction(step: Instruction) {
    this.instructionsList.push(step);
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
  getInstructions() {
    return this.instructionsList.slice();
  }

  publishData(form: FormGroup) {
    this.formData.push(form);
  }
}
