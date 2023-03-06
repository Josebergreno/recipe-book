import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-browse-recipes',
  templateUrl: './browse-recipes.component.html',
  styleUrls: ['./browse-recipes.component.css'],
})
export class BrowseRecipesComponent implements OnInit {
  recipes!: Recipe[];
  constructor(private recipeService: RecipeService, private router: Router) {}
  onSearch(inputRef: string) {
    this.recipeService.recipeSearch(inputRef);
  }
  goToRecipe() {}
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
