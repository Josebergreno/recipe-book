import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IngredientService } from './ingredient.service';
import { InstructionsService } from './instructions.service';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
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

  recipeName!: string;
  recipeUrl!: string;
  briefDesc!: string;
  conclusion!: string;
  loadedRecipes: Recipe[] = [];

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
    const filteredArr = this.loadedRecipes.filter((recipe) => {
      return recipe.recipeName.toLowerCase() == inputVal.toLowerCase();
    });
    console.log(this.loadedRecipes);
    console.log(filteredArr);
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

        this.loadedRecipes = postsArray.flat();
        return postsArray.flat();
      })
    );
  }
}
