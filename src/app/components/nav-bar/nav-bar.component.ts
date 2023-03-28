import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticateService } from 'src/app/services/authenticate.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthenticateService) {}
  isAuthenticated = false;
  private userSub!: Subscription;
  onLogout() {
    this.isAuthenticated = false;
    this.authService.logOut();
  }

  ngOnInit() {
    this.userSub = this.authService.currentUserAuth.subscribe((user) => {
      const userAuthJSON = localStorage.getItem('userAuthData');
      let userAuthData;
      if (userAuthJSON) {
        userAuthData = JSON.parse(userAuthJSON);
      }
      if (userAuthData || user) {
        this.isAuthenticated = true;
      } else this.isAuthenticated = false;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
