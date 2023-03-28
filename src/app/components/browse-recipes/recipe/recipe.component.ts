import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription, tap } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { UserData } from 'src/app/models/userData.model';

import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  id!: number;
  recipeName!: string;
  recipe!: Recipe;
  curUser!: UserData | null;
  modalTriggered: any = null;
  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private dataService: DataStorageService,
    private authService: AuthenticateService
  ) {}
  triggerDeleteModal() {
    this.modalTriggered = true;
  }
  onRecipeDelete() {}

  canEdit(canEdit?: boolean) {
    const currentUser = this.dataService.curUser?.value;
    let sameNames;
    if (currentUser && this.recipe) {
      sameNames =
        this.recipe.author ===
        currentUser?.firstName + ' ' + currentUser?.lastName
          ? true
          : null;
    }
    return sameNames;
  }

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
