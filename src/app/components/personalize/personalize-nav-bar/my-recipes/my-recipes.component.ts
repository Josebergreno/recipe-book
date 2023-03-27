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
      if (recipes) {
        this.myRecipes = recipes;
        localStorage.setItem('myRecipes', JSON.stringify(recipes));
      } else {
        const myRecipesJSON = localStorage.getItem('myRecipes');
        let myRecipesData;
        if (myRecipesJSON) {
          myRecipesData = JSON.parse(myRecipesJSON);
          this.myRecipes = myRecipesData;
        }
      }
    });
  }
}
