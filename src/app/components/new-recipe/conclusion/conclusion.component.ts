import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css'],
})
export class ConclusionComponent {
  constructor(private router: Router) {}
  submitted = false;
  onBack() {
    this.router.navigate(['new-recipe', 'instructions']);
  }
  onPublish(formRef: NgForm) {
    console.log('published');
    console.log(formRef.submitted);
    this.submitted = true;
  }
}
