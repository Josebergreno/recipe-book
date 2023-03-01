import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../models/ingredient.model';
import { OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Instruction } from '../models/instruction.model';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit {
  ingredientsList: Ingredient[] = [];
  instructionsList: Instruction[] = [];
  changeImg = false;
  fileName = '';

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
      this.ingredientsList.push(
        new Ingredient(ingName, fraction, this.ingredientsList.length + 1)
      );
    } else if (
      ingName !== '' &&
      ingAmt1 === 0 &&
      ingAmt2 > 0 &&
      ingAmt3 > 0 &&
      ingAmt2 < ingAmt3
    ) {
      const fraction = ingAmt2 + '/' + ingAmt3;
      this.ingredientsList.push(
        new Ingredient(ingName, fraction, this.ingredientsList.length + 1)
      );
    } else if (ingName !== '' && ingAmt1 > 0 && ingAmt2 === 0 && ingAmt3 === 0)
      this.ingredientsList.push(
        new Ingredient(ingName, `${ingAmt1}`, this.ingredientsList.length + 1)
      );
  }

  onItemDelete(event: any) {
    const arrayIndex = event.target.parentElement.children[0].id;
    this.ingredientsList.splice(arrayIndex, 1);
  }
  onStepAdd() {
    console.log('step added');
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

  ngOnInit() {}
}
