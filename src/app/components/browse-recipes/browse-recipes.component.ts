import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { UserData } from 'src/app/models/userData.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-browse-recipes',
  templateUrl: './browse-recipes.component.html',
  styleUrls: ['./browse-recipes.component.css'],
})
export class BrowseRecipesComponent implements OnInit {
  recipes!: Recipe[];
  firstName!: string;
  constructor(
    private recipeService: RecipeService,
    private authService: AuthenticateService
  ) {}
  onSearch(inputRef: string) {
    this.recipeService.recipeSearch(inputRef);
  }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((loadedPosts: Recipe[]) => {
      this.recipes = loadedPosts;
    });
    this.authService.currentUserAuth.subscribe((user) => console.log(user));
    this.authService.getUser().subscribe((resData: UserData) => {
      const resObj = Object.values(resData);
      this.firstName = resData.firstName;

      console.log(resObj);
    });
  }
}
