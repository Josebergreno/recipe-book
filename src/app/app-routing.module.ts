import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BrowseRecipesComponent } from './components/browse-recipes/browse-recipes.component';
import { RecipeComponent } from './components/browse-recipes/recipe/recipe.component';
import { LoginComponent } from './components/login/login.component';
import { BriefDescriptionComponent } from './components/new-recipe/brief-description/brief-description.component';
import { ConclusionComponent } from './components/new-recipe/conclusion/conclusion.component';
import { IngredientsComponent } from './components/new-recipe/ingredients/ingredients.component';
import { InstructionsComponent } from './components/new-recipe/instructions/instructions.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { RecipeNameComponent } from './components/new-recipe/recipe-name/recipe-name.component';
import { RecipePictureComponent } from './components/new-recipe/recipe-picture/recipe-picture.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MyRecipesComponent } from './components/personalize/personalize-nav-bar/my-recipes/my-recipes.component';
import { PersonalizeComponent } from './components/personalize/personalize.component';
import { SignupComponent } from './components/signup/signup.component';
import { FavoritesComponent } from './components/personalize/personalize-nav-bar/favorites/favorites.component';
import { NotificationsComponent } from './components/personalize/personalize-nav-bar/notifications/notifications.component';

const routes: Routes = [
  { path: '', component: BrowseRecipesComponent },
  {
    path: 'browse-recipes',
    component: BrowseRecipesComponent,
  },
  {
    path: 'browse-recipes/:id/:recipe-name',
    component: RecipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-recipe',
    component: NewRecipeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'recipe-name',
        component: RecipeNameComponent,
      },
      { path: 'recipe-picture', component: RecipePictureComponent },
      { path: 'brief-description', component: BriefDescriptionComponent },
      { path: 'ingredients', component: IngredientsComponent },
      { path: 'instructions', component: InstructionsComponent },
      { path: 'conclusion', component: ConclusionComponent },
    ],
  },
  {
    path: 'personalize',
    component: PersonalizeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'my-recipes', component: MyRecipesComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'favorites', component: FavoritesComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
