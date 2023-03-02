import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-recipe-name',
  templateUrl: './recipe-name.component.html',
  styleUrls: ['./recipe-name.component.css'],
})
export class RecipeNameComponent {
  constructor(private router: Router) {}

  onBack() {
    this.router.navigate(['new-recipe']);
  }
  onNext() {
    this.router.navigate(['new-recipe', 'recipe-picture']);
  }
}
