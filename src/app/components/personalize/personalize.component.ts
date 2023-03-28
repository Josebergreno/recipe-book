import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.scss'],
})
export class PersonalizeComponent implements OnInit {
  imgSrc: any = '/assets/placeHolderImg.webp';
  selectedImg: any = null;
  patchData: any = {};
  updateRes = '';
  backButtonVisible: boolean = false;

  personalizeForm = new FormGroup({
    firstName: new FormControl({ value: '', disabled: true }),
    lastName: new FormControl({ value: '', disabled: true }),
    desc: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,
    private dataService: DataStorageService,
    private cdr: ChangeDetectorRef
  ) {}

  onBack() {
    this.router.navigate(['personalize']);
  }

  onNameChange(e: Event) {
    let target;
    ((e.target as HTMLButtonElement) || HTMLInputElement).id === 'firstName'
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
      this.imgSrc = event.target.files[0];
    } else {
      this.imgSrc = '/assets/placeHolderImg.webp';
      this.selectedImg = null;
    }
  }
  onSubmit() {
    Object.entries(this.personalizeForm.controls).forEach((data) => {
      const key = data[0];
      const val = data[1].value;
      this.patchData[key] = val;
    });
    if (this.selectedImg) {
      const filePath = `profilePictures/${
        this.selectedImg.name
      }_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImg)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.imgSrc = url;
              this.patchData['imgPath'] = this.imgSrc;
              this.dataService.updateUserData(this.patchData);
            });
          })
        )
        .subscribe((val) => {});
    } else this.dataService.updateUserData(this.patchData);
  }

  formInit(curUser?: any) {
    if (curUser) {
      for (const key in this.personalizeForm.controls) {
        this.personalizeForm.get(key)?.setValue(curUser[key as keyof UserData]);
        if (curUser?.['imgPath']) {
          this.imgSrc = curUser?.['imgPath'];
        } else this.imgSrc = '/assets/placeHolderImg.webp';
      }
    } else {
      const userAuthJSON = localStorage.getItem('userAuthData');
      let userAuthData;
      let email;
      if (userAuthJSON) {
        userAuthData = JSON.parse(userAuthJSON);
        email = userAuthData.email;
      }
      this.dataService.getUserData(email);
    }
  }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.backButtonVisible = false;
      this.formInit();
      this.cdr.detectChanges();
    });
    this.dataService.curUser.subscribe((user) => {
      this.formInit(user);
    });

    this.dataService.profileUpdate.subscribe((res) => {
      this.updateRes = res;
    });
  }
}
