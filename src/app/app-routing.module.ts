import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseRecipesComponent } from './components/browse-recipes/browse-recipes.component';
import { LoginComponent } from './components/login/login.component';
import { BriefDescriptionComponent } from './components/new-recipe/brief-description/brief-description.component';
import { ConclusionComponent } from './components/new-recipe/conclusion/conclusion.component';
import { IngredientsComponent } from './components/new-recipe/ingredients/ingredients.component';
import { InstructionsComponent } from './components/new-recipe/instructions/instructions.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { RecipeNameComponent } from './components/new-recipe/recipe-name/recipe-name.component';
import { RecipePictureComponent } from './components/new-recipe/recipe-picture/recipe-picture.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PersonalizeComponent } from './components/personalize/personalize.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'home', component: BrowseRecipesComponent },
  { path: 'browse-recipes', component: BrowseRecipesComponent },
  {
    path: 'new-recipe',
    component: NewRecipeComponent,
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
  { path: 'personalize', component: PersonalizeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
