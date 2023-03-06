import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css'],
})
export class ConclusionComponent {
  constructor(private router: Router, private recipeService: RecipeService) {}
  submitted = false;
  onBack() {
    this.router.navigate(['new-recipe', 'instructions']);
  }
  onPublish(formRef: NgForm) {
    console.log('published');
    this.recipeService.addConclusion(formRef.value.conclusion);
    this.recipeService.publishRecipe();
    this.submitted = true;
  }
}
