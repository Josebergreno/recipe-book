import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find, map, Subject, tap, mergeMap } from 'rxjs';
import { UserAuth } from '../models/userAuth.model';
import { UserData } from '../models/userData.model';
import { environment } from 'src/environments/environment.development';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  currentUserAuth = new Subject<UserAuth>();
  currentUserData = new Subject<UserData>();
  profileUpdate = new Subject<string>();
  curUser!: UserData;
  constructor(private http: HttpClient) {}

  signupUser(user: UserData) {
    this.http
      .post<UserData>(`${environment.apiUrlUserData}`, user)
      .subscribe((resData) => console.log(resData));

    return this.http.post<AuthResponseData>(`${environment.apiUrlSignup}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    });
  }
  loginUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${environment.apiUrlSignIn}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const userAuthData = new UserAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );

          this.currentUserAuth.next(userAuthData);
        })
      );
  }

  logOut() {
    this.curUser = new UserData('', '', '', '', '', '', '', '');
  }

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
          this.currentUserData.next(currentUser);
          localStorage.setItem('email', resObj.email);

          this.curUser = currentUser;
        },
        error: (errorData) => {
          console.log(errorData);
        },
      });
  }

  updateUserInfo(patchData: any) {
    console.log(patchData);
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
