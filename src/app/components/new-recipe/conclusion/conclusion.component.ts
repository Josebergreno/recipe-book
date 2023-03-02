import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css'],
})
export class ConclusionComponent {
  constructor(private router: Router) {}
  onBack() {
    this.router.navigate(['new-recipe', 'instructions']);
  }
  onPublish() {
    this.router.navigate(['new-recipe', 'conclusion']);
  }
}
