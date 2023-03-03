import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-brief-description',
  templateUrl: './brief-description.component.html',
  styleUrls: ['./brief-description.component.css'],
})
export class BriefDescriptionComponent implements OnInit, OnDestroy {
  onSlideOut!: boolean;
  constructor(private router: Router) {}
  onBack() {
    this.router.navigate(['new-recipe', 'recipe-picture']);
  }
  onNext(formRef: NgForm) {
    this.onSlideOut = true;
    setTimeout(() => this.router.navigate(['new-recipe', 'ingredients']), 1000);
  }

  ngOnInit(): void {
    this.onSlideOut = false;
  }
  ngOnDestroy(): void {
    this.onSlideOut = false;
  }
}
