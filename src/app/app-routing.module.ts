import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseRecipesComponent } from './components/browse-recipes/browse-recipes.component';
import { LoginComponent } from './components/login/login.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PersonalizeComponent } from './components/personalize/personalize.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'home', component: BrowseRecipesComponent },
  { path: 'browse-recipes', component: BrowseRecipesComponent },
  { path: 'new-recipe', component: NewRecipeComponent },
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
