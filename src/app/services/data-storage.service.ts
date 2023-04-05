import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import { map, Subject } from 'rxjs';
import { UserData } from '../models/userData.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  firstName = new BehaviorSubject<any>(null);
  curUser = new BehaviorSubject<UserData | null>(null);
  profileUpdate = new Subject<string>();
  constructor(private http: HttpClient, private router: Router) {}

  postUserData(user: UserData) {
    this.http.post<UserData>(`${environment.apiUrlUserData}`, user).subscribe();
  }
  getUserData(email: string) {
    return this.fetchUserData(email);
  }

  private fetchUserData(email: string) {
    return this.http
      .get<UserData>(`${environment.apiUrlUserData}`)
      .pipe(
        map((val: any) => {
          return val.filter((user: any) => {
            return user.email === email;
          });
        })
      )
      .subscribe({
        next: (resData) => {
          const resObj: any = resData[0];
          const currentUser = new UserData(
            resObj.email,
            resObj.firstName,
            resObj.lastName,
            resObj.password,
            resObj.securityQuestion,
            resObj.securityAnswer,
            resObj.imgPath,
            resObj.desc,
            resObj.id
          );
          this.curUser.next(currentUser);
          this.firstName.next(resObj.firstName);
        },
        error: (errorData) => {
          console.log(errorData);
        },
      });
  }

  updateUserData(patchData: any) {
    const currentUser = this.curUser?.value;
    const img = patchData?.['imgPath']
      ? patchData?.['imgPath']
      : currentUser?.['imgPath'];
    if (currentUser) {
      const updatedUserData = new UserData(
        currentUser.email,
        patchData.firstName,
        patchData.lastName,
        currentUser.password,
        currentUser.securityQuestion,
        currentUser.securityAnswer,
        img,
        patchData.desc,
        currentUser.id
      );
      const obj = {
        email: currentUser.email,
        firstName: patchData.firstName,
        lastName: patchData.lastName,
        password: currentUser.password,
        securityQuestion: currentUser.securityQuestion,
        securityAnswer: currentUser.securityAnswer,
        imgPath: img,
        desc: patchData.desc,
        id: currentUser.id,
      };
      this.curUser.next(updatedUserData);

      this.http.put(environment.apiUrlUserData, this.curUser.value).subscribe({
        next: (resData) => {
          console.log(resData);
          window.scrollTo(0, 0);
          this.profileUpdate.next('Your Profile has been updated!');
        },
        error: (err) => {
          console.log(err);
          window.scrollTo(0, 0);
          this.profileUpdate.next(
            'There has been an error updating your profile'
          );
        },
      });
    }
  }
}
