import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css'],
})
export class PersonalizeComponent implements OnInit {
  imgSrc: any = '/assets/placeHolderImg.webp';
  selectedImg: any = null;
  patchData: any = {};
  updateRes = '';
  curUser: any;
  personalizeForm = new FormGroup({
    firstName: new FormControl({ value: '', disabled: true }),
    lastName: new FormControl({ value: '', disabled: true }),
    desc: new FormControl(''),
  });

  constructor(
    private authService: AuthenticateService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) {}

  onNameChange(e: Event) {
    let target;
    (e.target as HTMLButtonElement).id === 'firstName'
      ? (target = 'firstName')
      : (target = 'lastName');
    this.personalizeForm.get(target)?.enabled
      ? this.personalizeForm.get(target)?.disable()
      : this.personalizeForm.get(target)?.enable();
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
  onSubmit() {
    const curUser = this.authService.curUser;
    const filePath = `profilePictures/${
      this.selectedImg?.name ? this.selectedImg?.name : 'image'
    }_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);

    this.storage
      .upload(filePath, this.selectedImg)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.imgSrc = url;
            if (curUser) {
              Object.entries(this.personalizeForm.controls).forEach((data) => {
                const key = data[0];
                const val = data[1].value;
                this.patchData[key] = val;
              });
              this.patchData['imgPath'] = this.imgSrc;
              this.authService.updateUserInfo(this.patchData);
            }
          });
        })
      )
      .subscribe((val) => {});
  }

  formInit() {
    const curUser = this.authService.curUser;
    if (curUser) {
      for (const key in this.personalizeForm.controls) {
        if (key === 'imgPath') {
          this.imgSrc = curUser[key as keyof UserData];
        }
        this.personalizeForm.get(key)?.setValue(curUser[key as keyof UserData]);
      }
    }
  }

  ngOnInit(): void {
    //get user with user auth
    this.authService.currentUserAuth.subscribe((userAuth) => {
      this.authService.getUserData(userAuth.email);
    });

    //when on personalize page, populate input fields with user data
    this.route.url.subscribe((url) => {
      this.curUser = this.authService.curUser;
      this.formInit();
    });

    this.authService.profileUpdate.subscribe((res) => {
      this.updateRes = res;
    });
  }
}
