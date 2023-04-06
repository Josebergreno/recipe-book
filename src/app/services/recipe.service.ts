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
  newRecipe = new BehaviorSubject<Recipe | null>(null);
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
  fullName: any =
    this.dataService.curUser.value?.firstName +
    ' ' +
    this.dataService.curUser.value?.lastName;
  publishRecipe() {
    const newRecipe = new Recipe(
      this.recipeName,
      this.recipeUrl,
      this.briefDesc,
      this.ingredientService.getIngredients(),
      this.instructionService.getInstructions(),
      this.conclusion,
      this.fullName
    );
    this.storeRecipes(newRecipe);
    this.newRecipe.next(newRecipe);
  }

  storeRecipes(newRecipe: Recipe) {
    this.http
      .post(
        `${environment.apiUrlRecipePost}`,
        JSON.stringify(this.newRecipe.value)
      )
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      });
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
    if (recipes && userData) {
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
      this.myRecipes.next(myRecipes);
    }
  }

  getDBRecipes() {
    return this.dBRecipes?.slice();
  }

  getRecipes() {
    return this.fetchRecipes();
  }

  private fetchRecipes() {
    return this.http.get<Recipe[]>(`${environment.apiUrlRecipeGet}`).pipe(
      map((resData) => {
        console.log(resData);
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
