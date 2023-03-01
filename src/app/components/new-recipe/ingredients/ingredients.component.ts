import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent {
  ingredientsList: Ingredient[] = [];
  @Input() parentForm!: FormGroup;
  @ViewChild('nameRef', { static: false }) ingNameRef!: ElementRef;
  @ViewChild('numRef1', { static: false }) numRef1!: ElementRef;
  @ViewChild('numRef2', { static: false }) numRef2!: ElementRef;
  @ViewChild('numRef3', { static: false }) numRef3!: ElementRef;
  @ViewChild('selectRef', { static: false }) selectRef!: ElementRef;

  resetIngredientInputs() {
    this.ingNameRef.nativeElement.value = '';
    this.numRef1.nativeElement.value = '';
    this.numRef2.nativeElement.value = '';
    this.numRef3.nativeElement.value = '';
    this.selectRef.nativeElement.value = '';
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
      this.resetIngredientInputs();
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
      this.resetIngredientInputs();
    } else if (ingName !== '' && ingAmt1 > 0 && ingAmt2 === 0 && ingAmt3 === 0)
      this.ingredientsList.push(
        new Ingredient(ingName, `${ingAmt1}`, this.ingredientsList.length + 1)
      );
    console.log(this.parentForm.get('ingName'));
    this.resetIngredientInputs();
  }
  onItemDelete(event: any) {
    const arrayIndex = event.target.parentElement.children[0].id;
    this.ingredientsList.splice(arrayIndex, 1);
  }
}
