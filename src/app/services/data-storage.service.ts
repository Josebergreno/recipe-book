import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import { map, Subject, mergeMap, find } from 'rxjs';
import { UserData } from '../models/userData.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  firstName = new BehaviorSubject<any>(null);
  curUser = new BehaviorSubject<UserData | null>(null);
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
    let updatedUser: UserData;
    if (currentUser) {
      const updatedUserData = new UserData(
        currentUser.email,
        patchData.firstName,
        patchData.lastName,
        currentUser.password,
        currentUser.securityQuestion,
        currentUser.securityAnswer,
        patchData.imgPath,
        patchData.desc
      );
      this.curUser.next(updatedUserData);
    }

    this.http
      .get(`${environment.apiUrlUserData}`)
      .pipe(
        mergeMap((resData: any) => {
          const resObj = Object.entries(resData);
          return resObj;
        }),
        find((user: any) => {
          return user[1].email === currentUser?.email;
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
