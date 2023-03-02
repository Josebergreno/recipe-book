import { Component } from '@angular/core';
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
  onNext() {
    this.router.navigate(['new-recipe', 'ingredients']);
  }
}
