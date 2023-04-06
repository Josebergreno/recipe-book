import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, BehaviorSubject } from 'rxjs';
import { UserAuth } from '../models/userAuth.model';
import { UserData } from '../models/userData.model';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { DataStorageService } from './data-storage.service';

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
  currentUserAuth = new BehaviorSubject<UserAuth | null>(null);
  tokenExpTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataStorage: DataStorageService
  ) {}

  authorizeUser(user: any) {
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
          this.dataStorage.getUserData(resData.email);
          this.currentUserAuth.next(userAuthData);
          this.autoLogout(+resData.expiresIn * 1000);
          localStorage.setItem('userAuthData', JSON.stringify(userAuthData));
        })
      );
  }

  autoLogin() {
    let userAuthJSON = localStorage.getItem('userAuthData');
    let userAuth: {
      email: string;
      id: string;
      _token: string;
      _tokenExpDate: string;
    };
    if (!userAuthJSON) {
      return;
    }
    userAuth = JSON.parse(userAuthJSON);
    const loadedUser = new UserAuth(
      userAuth.email,
      userAuth.id,
      userAuth._token,
      new Date(userAuth._tokenExpDate)
    );
    if (loadedUser.token) {
      this.currentUserAuth.next(loadedUser);
      const expDur =
        new Date(userAuth._tokenExpDate).getTime() - new Date().getTime();
      this.autoLogout(expDur);
    }
  }

  logOut() {
    this.router.navigate(['login']);
    localStorage.clear();
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }
  autoLogout(expDur: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logOut();
    }, expDur);
  }

  routeGuard() {
    const userAuthJSON = localStorage.getItem('userAuthData');
    if (userAuthJSON) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
