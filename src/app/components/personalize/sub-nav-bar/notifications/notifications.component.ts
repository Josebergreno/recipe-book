import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  host: { class: 'main-container' },
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  notificationType: string = 'likes';
  notificationNum: number = 1;
}
