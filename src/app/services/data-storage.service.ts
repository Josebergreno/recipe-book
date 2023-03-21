import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import { map, Subject, mergeMap, find } from 'rxjs';
import { UserData } from '../models/userData.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  firstName = new Subject<string>();
  curUser!: UserData;
  profileUpdate = new Subject<string>();
  constructor(private http: HttpClient) {}
  getUserData(email: string) {
    return this.fetchUserData(email);
  }

  private fetchUserData(email: string) {
    return this.http
      .get<UserData>(`${environment.apiUrlUserData}`)
      .pipe(
        map((val: any) => {
          const resObj = Object.values(val);
          const filteredObj = resObj.filter(
            (user: any) => user.email === email
          );
          return filteredObj;
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
            resObj.desc
          );
          localStorage.setItem('firstName', resObj.firstName);
          this.curUser = currentUser;
        },
        error: (errorData) => {
          console.log(errorData);
        },
      });
  }

  updateUserInfo(patchData: any) {
    const updatedUser = new UserData(
      this.curUser.email,
      patchData.firstName,
      patchData.lastName,
      this.curUser.password,
      this.curUser.securityQuestion,
      this.curUser.securityAnswer,
      patchData.imgPath,
      patchData.desc
    );

    this.http
      .get(`${environment.apiUrlUserData}`)
      .pipe(
        mergeMap((resData: any) => {
          const resObj = Object.entries(resData);
          return resObj;
        }),
        find((user: any) => {
          return user[1].email === this.curUser.email;
        }),
        mergeMap((user) => {
          return this.http.patch(
            `${environment.apiUrlPatchUserData + user[0] + '.json'}`,
            updatedUser
          );
        })
      )
      .subscribe({
        next: (resData) => {
          this.profileUpdate.next('Your Profile has been updated!');
        },
        error: (err) => {
          this.profileUpdate.next(
            'There has been an error updating your profile'
          );
        },
      });
  }
}
