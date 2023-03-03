import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, timer } from 'rxjs';
@Component({
  selector: 'app-recipe-name',
  templateUrl: './recipe-name.component.html',
  styleUrls: ['./recipe-name.component.css'],
})
export class RecipeNameComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}
  onSlideOut!: boolean;
  onSlideIn!: boolean;
  onBack() {
    this.router.navigate(['new-recipe']);
  }
  onNext(formRef: NgForm) {
    this.onSlideOut = true;
    setTimeout(
      () => this.router.navigate(['new-recipe', 'recipe-picture']),
      500
    );
  }
  ngOnInit(): void {
    this.onSlideOut = false;
    this.onSlideIn = true;
  }
  ngOnDestroy(): void {
    this.onSlideOut = false;
    this.onSlideIn = false;
  }
}
