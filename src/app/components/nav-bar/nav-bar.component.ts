import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserData } from 'src/app/models/userData.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
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
      this.isAuthenticated = !!user;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
