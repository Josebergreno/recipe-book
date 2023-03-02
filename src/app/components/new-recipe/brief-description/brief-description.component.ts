import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-brief-description',
  templateUrl: './brief-description.component.html',
  styleUrls: ['./brief-description.component.css'],
})
export class BriefDescriptionComponent {
  constructor(private router: Router) {}
  onBack() {
    this.router.navigate(['new-recipe', 'recipe-picture']);
  }
  onNext(formRef: NgForm) {
    console.log('submitted');
    this.router.navigate(['new-recipe', 'ingredients']);
  }
}
