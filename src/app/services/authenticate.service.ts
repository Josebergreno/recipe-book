import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, find, map, Subject, tap } from 'rxjs';
import { UserAuth } from '../models/userAuth.model';
import { UserData } from '../models/userData.model';
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
      .post<UserData>(
        'https://ng-recipe-book-17639-default-rtdb.firebaseio.com/userData.json',
        user
      )
      .subscribe((resData) => console.log(resData));

    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsJY4UpFQN5ym9TsvoepJaCT_KTrYoG4M',
      { email: user.email, password: user.password, returnSecureToken: true }
    );
  }
  loginUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsJY4UpFQN5ym9TsvoepJaCT_KTrYoG4M',
        { email: email, password: password, returnSecureToken: true }
      )
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
  getUser() {
    return this.fetchUserData();
  }
  private fetchUserData() {
    return this.http
      .get<UserData>(
        'https://ng-recipe-book-17639-default-rtdb.firebaseio.com/userData.json'
      ) //filter the user data that ends up being returned
      .pipe(
        tap((resData) => {
          const userData = new UserData(
            resData.email,
            resData.firstName,
            resData.lastName,
            resData.password,
            resData.securityQuestion,
            resData.securityAnswer,
            resData.imgPath
          );
          this.currentUserData.next(userData);
        })
      );
  }
}
