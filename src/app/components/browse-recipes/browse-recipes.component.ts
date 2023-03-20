import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { UserData } from 'src/app/models/userData.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-browse-recipes',
  templateUrl: './browse-recipes.component.html',
  styleUrls: ['./browse-recipes.component.css'],
})
export class BrowseRecipesComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  firstName!: string | null;
  currentUserData!: UserData;
  currentUserEmail!: string;
  userSub!: Subscription;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthenticateService,
    private dataService: DataStorageService
  ) {}
  onSearch(inputRef: string) {
    this.recipeService.recipeSearch(inputRef);
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.recipeService.getRecipes().subscribe((loadedPosts: Recipe[]) => {
      this.recipes = loadedPosts;
    });

    this.dataService.firstName.subscribe((name) => {
      this.firstName = name;
    });
  }
  ngOnDestroy(): void {}
}
