import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { UserData } from 'src/app/models/userData.model';

import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css'],
})
export class PersonalizeComponent implements OnInit, OnDestroy {
  changeName = false;
  imgSrc = '/assets/placeHolderImg.webp';
  selectedImg: any = null;
  personalizeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    imgSource: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private authService: AuthenticateService,
    private route: ActivatedRoute
  ) {}

  onNameChange() {
    this.personalizeForm.get('name')?.disabled
      ? this.personalizeForm.get('name')?.enable()
      : this.personalizeForm.get('name')?.disable();
  }

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

  onSubmit() {}
  formInit() {
    const curUser = this.authService.curUser;
    if (curUser) {
      this.personalizeForm.get('firstName')?.setValue(curUser.firstName);
      this.personalizeForm.get('lastName')?.setValue(curUser.lastName);
      if (curUser.imgPath) {
        this.personalizeForm.get('imgSource')?.setValue(curUser.imgPath);
      }
      if (curUser.desc) {
        this.personalizeForm.get('description')?.setValue(curUser.desc);
      }
    }
  }

  ngOnInit(): void {
    //get user with user auth
    this.authService.currentUserAuth.subscribe((userAuth) => {
      this.authService.getUser(userAuth.email);
    });

    //when on personalize page, populate input fields with user data
    this.route.url.subscribe((url) => {
      this.formInit();
    });
  }
  ngOnDestroy(): void {}
}
