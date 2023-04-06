import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import { map, Subject } from 'rxjs';
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

  postUserData(user: any) {
    return this.http.post<UserData>(`${environment.apiUrlUserData}`, user);
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
            resObj.id,
            resObj.email,
            resObj.firstName,
            resObj.lastName,
            resObj.password,
            resObj.securityQuestion,
            resObj.securityAnswer,
            resObj.imgPath,
            resObj.description
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
        currentUser.id,
        currentUser.email,
        patchData.firstName,
        patchData.lastName,
        currentUser.password,
        currentUser.securityQuestion,
        currentUser.securityAnswer,
        img,
        patchData.description
      );
      this.curUser.next(updatedUserData);
      this.http.put(environment.apiUrlUserData, this.curUser.value).subscribe({
        next: (resData) => {
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
