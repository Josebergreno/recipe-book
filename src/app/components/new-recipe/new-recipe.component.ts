import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit {
  changeImg = false;
  fileName = '';

  form!: FormGroup;

  constructor(recipeService: RecipeService) {}

  onSubmit(formRef: FormGroup) {
    console.log(formRef.value);
    formRef.reset();
  }

  onFileSelected(event: any) {
    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.fileName = event.target.result;
      };

      this.changeImg = true;
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      //recipe name
      recipeName: new FormControl(null, Validators.required),
      //img file
      imgFile: new FormControl(null, Validators.required),
      // brief description
      briefDesc: new FormControl(null, Validators.required),
      // instructions
      cookTime: new FormControl(null),
      unitOfTime: new FormControl(null),
      ingStepDesc: new FormControl(null),
      // conclusion
      conclusion: new FormControl(null, Validators.required),
      //ingredients
      ingName: new FormControl(null, Validators.required),
      numInput1: new FormControl(null),
      numInput2: new FormControl(null),
      numInput3: new FormControl(null),
      measurement: new FormControl(null, Validators.required),
    });
  }
}
