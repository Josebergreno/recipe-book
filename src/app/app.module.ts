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
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeNameComponent } from './components/new-recipe/recipe-name/recipe-name.component';
import { RecipePictureComponent } from './components/new-recipe/recipe-picture/recipe-picture.component';
import { BriefDescriptionComponent } from './components/new-recipe/brief-description/brief-description.component';
import { IngredientsComponent } from './components/new-recipe/ingredients/ingredients.component';
import { InstructionsComponent } from './components/new-recipe/instructions/instructions.component';
import { ConclusionComponent } from './components/new-recipe/conclusion/conclusion.component';
import { RecipeComponent } from './components/browse-recipes/recipe/recipe.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment.development';
import { TruncatePipe } from './truncate.pipe';
import { MyRecipesComponent } from './components/personalize/sub-nav-bar/my-recipes/my-recipes.component';
import { NotificationsComponent } from './components/personalize/sub-nav-bar/notifications/notifications.component';
import { FavoritesComponent } from './components/personalize/sub-nav-bar/favorites/favorites.component';

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
    RecipeNameComponent,
    RecipePictureComponent,
    BriefDescriptionComponent,
    IngredientsComponent,
    InstructionsComponent,
    ConclusionComponent,
    RecipeComponent,
    TruncatePipe,
    MyRecipesComponent,
    NotificationsComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
