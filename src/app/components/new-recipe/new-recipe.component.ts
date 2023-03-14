import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private recipeService: RecipeService) {}
  newRecipe: any = null;

  addRecipe() {
    this.newRecipe = true;
    localStorage.setItem('new-recipe', this.newRecipe);
    this.router.navigate(['new-recipe', 'recipe-name']);
  }

  ngOnInit(): void {
    this.newRecipe = localStorage.getItem('new-recipe');
  }

  ngOnDestroy(): void {
    localStorage.removeItem('new-recipe');
  }
}
