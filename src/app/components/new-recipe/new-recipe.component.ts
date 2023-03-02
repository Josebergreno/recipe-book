import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  routerUrl!: string;
  newRecipeButton = true;
  addRecipe() {
    this.newRecipeButton = false;
    this.router.navigate(['new-recipe', 'recipe-name']);
  }

  ngOnInit(): void {}
}
