import { Injectable } from '@angular/core';
import { Instruction } from '../models/instruction.model';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}
  instructionsList: Instruction[] = [];
  ingredientList: Ingredient[] = [];
  recipeName!: string;
  recipeUrl!: string;
  briefDesc!: string;
  conclusion!: string;

  recipeArray: Recipe[] = [
    new Recipe(
      'Chicken Soup',
      'https://www.ambitiouskitchen.com/wp-content/uploads/2018/02/chickensoup-2-750x750.jpg',
      'yummy chicken soup',
      [new Ingredient('Chicken', '1', 1)],

      [new Instruction('stir the soup', 10, 'minutes')],
      'all done.'
    ),
    new Recipe(
      'Beef Burger',
      'https://www.kerrygold.de/wp-content/uploads/images/1962/Burger_mit_Paprika-Mango-Chutney_Querformat_3-scaled_5368cb5.webp',
      'yummy beef burger',
      [new Ingredient('Beef', '1', 2)],
      [new Instruction('flip the beef', 10, 'minutes')],
      'all done.'
    ),
  ];

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

  addRecipeName(recipeName: string) {
    this.recipeName = recipeName;
  }
  addRecipePic(recipeUrl: string) {
    this.recipeUrl = recipeUrl;
  }
  addBriefDesc(briefDesc: string) {
    this.briefDesc = briefDesc;
  }
  addConclusion(conclusion: string) {
    this.conclusion = conclusion;
    console.log(this.conclusion);
  }
  publishRecipe() {
    const newRecipe = new Recipe(
      this.recipeName,
      this.recipeUrl,
      this.briefDesc,
      this.ingredientList,
      this.instructionsList,
      this.conclusion
    );
    this.recipeArray.push(newRecipe);
    this.storeRecipes();
  }
  recipeSearch(inputVal: string) {
    const filteredArr = this.recipeArray.filter(
      (recipe) => recipe.recipeName.toLowerCase() === inputVal.toLowerCase()
    );
    console.log(filteredArr);
  }
  getRecipes() {
    return this.fetchRecipes();
  }
  getIndivRecipe(id: number, recipeName: string) {
    return this.recipeArray[id];
  }

  storeRecipes() {
    this.http
      .post(
        'https://ng-recipe-book-17639-default-rtdb.firebaseio.com/recipes.json',
        this.recipeArray
      )
      .subscribe((resData) => console.log(resData));
    console.log('recipe stored');
  }
  private fetchRecipes() {
    this.http
      .get(
        'https://ng-recipe-book-17639-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((resData) => {
          const postsArray = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              postsArray.push({ ...resData[key], id: key });
            }
          }
        })
      )
      .subscribe((loadedPosts) => {
        console.log(loadedPosts);
      });
  }
}
