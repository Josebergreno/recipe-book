import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { IngredientService } from './ingredient.service';
import { InstructionsService } from './instructions.service';
import { environment } from 'src/environments/environment.development';

import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private http: HttpClient,
    private ingredientService: IngredientService,
    private instructionService: InstructionsService,
    private dataService: DataStorageService
  ) {}

  private dBRecipes!: Recipe[] | undefined;
  loadedRecipes = new BehaviorSubject<Recipe[] | undefined>(undefined);
  myRecipes = new BehaviorSubject<Recipe[] | undefined>(undefined);
  recipeName!: string;
  recipeUrl!: string;
  briefDesc!: string;
  conclusion!: string;

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
  }
  publishRecipe() {
    const fullName =
      this.dataService.curUser.value?.firstName +
      ' ' +
      this.dataService.curUser.value?.lastName;

    const newRecipe = new Recipe(
      this.recipeName,
      this.recipeUrl,
      this.briefDesc,
      this.ingredientService.getIngredients(),
      this.instructionService.getInstructions(),
      this.conclusion,
      fullName
    );
    this.storeRecipes(newRecipe);
  }
  storeRecipes(newRecipe: Recipe) {
    this.http
      .post(`${environment.apiUrlRecipe}`, newRecipe)
      .subscribe((resData) => console.log(resData));
  }

  recipeSearch(inputVal: string) {
    const filteredArr: Recipe[] | undefined = this.loadedRecipes?.value?.filter(
      (recipe) => {
        return recipe.recipeName.toLowerCase().includes(inputVal.toLowerCase());
      }
    );
    this.loadedRecipes.next(filteredArr);
  }
  fetchMyRecipes(recipes: Recipe[] | undefined) {
    const userAuthJSON = localStorage.getItem('userAuthData');
    const userData = userAuthJSON ? JSON.parse(userAuthJSON) : null;
    let myRecipes;
    if (recipes) {
      myRecipes = recipes.filter((recipe) => {
        const fullName =
          this.dataService.curUser?.value?.firstName +
          ' ' +
          this.dataService.curUser?.value?.lastName;
        return (
          recipe.author === fullName &&
          userData.email === this.dataService.curUser.value?.email
        );
      });
    }
    this.myRecipes.next(myRecipes);
  }
  getDBRecipes() {
    return this.dBRecipes?.slice();
  }

  getRecipes() {
    return this.fetchRecipes();
  }

  private fetchRecipes() {
    return this.http.get<Recipe[]>(`${environment.apiUrlRecipe}`).pipe(
      map((resData) => {
        const postsArray: Recipe[] = [];
        const values = Object.values(resData);
        values.forEach((recipe: Recipe) => postsArray.push(recipe));
        this.loadedRecipes.next(postsArray.flat());
        this.dBRecipes = postsArray.flat();
        this.fetchMyRecipes(this.loadedRecipes.value);
        return postsArray.flat();
      })
    );
  }
}
