import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-recipe-picture',
  templateUrl: './recipe-picture.component.html',
  styleUrls: ['./recipe-picture.component.css'],
})
export class RecipePictureComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private storage: AngularFireStorage
  ) {}
  imgSrc = '/assets/placeHolderImg.webp';
  selectedImg: any = null;
  onSlideOut = false;
  onSlideIn!: boolean;
  @ViewChild('formRef', { static: false }) formRef!: NgForm;

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => (this.imgSrc = event.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      this.imgSrc = '/assets/placeHolderImg.webp';
      this.selectedImg = null;
    }
  }

  onBack(formRef: NgForm) {
    this.router.navigate(['new-recipe', 'recipe-name']);
  }
  onNext(formRef: NgForm) {
    if (formRef.valid) {
      const filePath = `images/${
        this.selectedImg.name
      }_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImg)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formRef.value.imgFile = url;
              this.recipeService.addRecipePic(formRef.value.imgFile);
            });
          })
        )
        .subscribe();
      this.onSlideOut = true;
      this.onSlideIn = false;

      setTimeout(
        () => this.router.navigate(['new-recipe', 'brief-description']),
        1000
      );
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.onSlideIn = true;
    });
  }
  ngOnDestroy(): void {
    this.onSlideOut = false;
    this.onSlideIn = false;
  }
}
