import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-brief-description',
  templateUrl: './brief-description.component.html',
  styleUrls: ['./brief-description.component.scss'],
})
export class BriefDescriptionComponent implements OnInit, OnDestroy {
  onSlideOut!: boolean;
  constructor(private router: Router, private recipeService: RecipeService) {}
  onBack() {
    this.router.navigate(['new-recipe', 'recipe-picture']);
  }
  onNext(formRef: NgForm) {
    this.onSlideOut = true;
    setTimeout(() => this.router.navigate(['new-recipe', 'ingredients']), 1000);
    this.recipeService.addBriefDesc(formRef.value.briefDesc);
  }
  onShake(formControl: NgModel) {
    if (!formControl.valid && formControl.touched) {
      return 'shake';
    } else return 'form-textarea';
  }

  ngOnInit(): void {
    this.onSlideOut = false;
  }
  ngOnDestroy(): void {
    this.onSlideOut = false;
  }
}
