import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription, tap } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
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
  modalTriggered: any = null;
  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private dataDervice: DataStorageService
  ) {}
  triggerDeleteModal() {
    this.modalTriggered = true;
  }
  onRecipeDelete() {}

  // canEdit(){
  // this.recipeService.myRecipes.value?.find(recipe=>{
  //   recipe.author===
  // })
  // }

  onBackClick() {
    this.router.navigate(['browse-recipes']);
  }
  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        mergeMap((params) => {
          this.id = params['id'];
          this.recipeName = params['recipe-name'];
          return this.recipeService.getRecipes();
        })
      )
      .subscribe((res) => {
        this.recipe = res[this.id];
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
