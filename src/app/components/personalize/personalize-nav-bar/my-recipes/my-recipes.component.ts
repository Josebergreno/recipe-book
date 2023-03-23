import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-my-recipes',
  host: { class: 'main-container' },
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css'],
})
export class MyRecipesComponent implements OnInit {
  myRecipes: any;
  constructor(private recipeService: RecipeService, private router: Router) {}
  onNavigate(id: number, recipeName: string) {
    return this.router.navigate(['browse-recipes', id, recipeName]);
  }
  onWindowChange(e?: any) {
    return window.innerWidth / 100;
  }
  ngOnInit(): void {
    this.recipeService.myRecipes.subscribe((recipes) => {
      this.myRecipes = recipes;
    });
  }
}
