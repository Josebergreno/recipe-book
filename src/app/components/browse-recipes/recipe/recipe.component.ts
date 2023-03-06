import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  id!: number;
  recipeName!: string;
  recipe!: Recipe;
  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}
  onRouteDetails() {
    console.log(this.route);
  }
  onBackClick() {
    this.router.navigate(['browse-recipes']);
  }
  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.recipeName = params['recipe-name'];
      this.recipe = this.recipeService.getIndivRecipe(this.id, this.recipeName);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
