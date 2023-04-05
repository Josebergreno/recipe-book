import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-browse-recipes',
  templateUrl: './browse-recipes.component.html',
  styleUrls: ['./browse-recipes.component.scss'],
})
export class BrowseRecipesComponent implements OnInit, OnDestroy {
  recipes!: Recipe[] | undefined;
  firstName!: string | null;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthenticateService,
    private dataService: DataStorageService,
    private http: HttpClient
  ) {}

  refreshPosts(inputVal: string) {
    const dBRecipes = this.recipeService.getDBRecipes();
    if (!inputVal) {
      this.recipes = dBRecipes;
      this.recipeService.loadedRecipes.next(dBRecipes);
    }
  }
  onSearch(inputRef: string) {
    this.recipeService.recipeSearch(inputRef);
  }
  onWindowChange(e?: any) {
    return window.innerWidth / 100;
  }
  ngOnInit(): void {
    this.authService.autoLogin();
    this.recipeService.getRecipes().subscribe((loadedPosts: Recipe[]) => {
      this.recipes = loadedPosts;
    });
    this.recipeService.loadedRecipes.subscribe((searchedRecipes) => {
      if (this.recipes !== searchedRecipes) {
        this.recipes = searchedRecipes;
      }
    });

    this.dataService.firstName.subscribe((name) => {
      this.firstName = name;
    });
  }
  ngOnDestroy(): void {
    this.dataService.firstName.next(null);
  }
}
