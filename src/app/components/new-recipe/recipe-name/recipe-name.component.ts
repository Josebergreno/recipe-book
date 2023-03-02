import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  onNext(formRef: NgForm) {
    console.log(formRef.controls['recipeName']);
    this.router.navigate(['new-recipe', 'recipe-picture']);
  }
}
