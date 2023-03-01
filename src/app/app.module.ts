import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { PersonalizeComponent } from './components/personalize/personalize.component';
import { BrowseRecipesComponent } from './components/browse-recipes/browse-recipes.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { InstructionsComponent } from './components/new-recipe/instructions/instructions.component';
import { IngredientsComponent } from './components/new-recipe/ingredients/ingredients.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    PersonalizeComponent,
    BrowseRecipesComponent,
    NewRecipeComponent,
    PageNotFoundComponent,
    SignupComponent,
    InstructionsComponent,
    IngredientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
