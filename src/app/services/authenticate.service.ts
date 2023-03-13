import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
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
  getUser(email: string) {
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
            resObj.securityAnswer
          );
          this.currentUserData.next(currentUser);
        },
        error: (errorData) => {
          console.log(errorData);
        },
      });
  }
}
