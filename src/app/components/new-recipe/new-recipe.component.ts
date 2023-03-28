import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss'],
})
export class NewRecipeComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}
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
