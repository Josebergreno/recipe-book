import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';

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
  // curUser: any;

  personalizeForm = new FormGroup({
    firstName: new FormControl({ value: '', disabled: true }),
    lastName: new FormControl({ value: '', disabled: true }),
    desc: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private dataService: DataStorageService
  ) {}

  loadPicture() {
    return this.imgSrc;
  }

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
      const curUser = this.dataService.curUser;
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

  formInit() {
    const curUser = this.dataService.curUser.value;
    if (curUser) {
      for (const key in this.personalizeForm.controls) {
        this.personalizeForm.get(key)?.setValue(curUser[key as keyof UserData]);
      }
      if (curUser.imgPath) {
        this.imgSrc = curUser.imgPath;
      } else this.imgSrc = '/assets/placeHolderImg.webp';
    }
  }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.formInit();
    });
    this.dataService.profileUpdate.subscribe((res) => {
      this.updateRes = res;
    });
  }
}
