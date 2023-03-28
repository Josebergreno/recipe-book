import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

import { RecipeService } from 'src/app/services/recipe.service';
@Component({
  selector: 'app-recipe-name',
  templateUrl: './recipe-name.component.html',
  styleUrls: ['./recipe-name.component.scss'],
})
export class RecipeNameComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private recipeService: RecipeService) {}
  onSlideOut!: boolean;
  onSlideIn!: boolean;
  @ViewChild('formRef', { static: false }) formRef!: NgForm;

  onNext(formRef: NgForm) {
    this.onSlideOut = true;

    setTimeout(
      () => this.router.navigate(['new-recipe', 'recipe-picture']),
      500
    );
    this.recipeService.addRecipeName(formRef.value.recipeName);
    localStorage.setItem('recipe-name', formRef.value.recipeName);
  }

  onShake(formControl: NgModel) {
    if (!formControl.valid && formControl.touched) {
      return 'shake';
    } else return 'form-input';
  }
  ngOnInit(): void {
    this.onSlideOut = false;
    this.onSlideIn = true;
    setTimeout(() =>
      this.formRef.controls['recipeName'].setValue(
        localStorage.getItem('recipe-name')
      )
    );
  }
  ngOnDestroy(): void {
    this.onSlideOut = false;
    this.onSlideIn = false;
  }
}
