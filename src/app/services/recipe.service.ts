import { Injectable } from '@angular/core';
import { Instruction } from '../models/instruction.model';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IngredientService } from './ingredient.service';
import { InstructionsService } from './instructions.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private http: HttpClient,
    private ingredientService: IngredientService,
    private instructionService: InstructionsService
  ) {}

  recipeName!: string;
  recipeUrl!: string;
  briefDesc!: string;
  conclusion!: string;
  loadedRecipes: Recipe[] = [];
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
      this.ingredientService.getIngredients(),
      this.instructionService.getInstructions(),
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
  getIndivRecipe(id: number) {
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
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-17639-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((resData) => {
          const postsArray: Recipe[] = [];
          const values = Object.values(resData);
          values.forEach((recipe: Recipe) => postsArray.push(recipe));
          return postsArray.flat();
        })
      );
  }
}
