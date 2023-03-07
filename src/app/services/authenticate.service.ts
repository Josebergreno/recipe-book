import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
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
  currentUser = new Subject<UserAuth>();
  constructor(private http: HttpClient) {}

  signupUser(user: UserData) {
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
          const user = new UserAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          this.currentUser.next(user);
        })
      );
  }
}
