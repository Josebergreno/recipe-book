import { Injectable } from '@angular/core';
import { PostComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}
  private comments: PostComment[] = [
    new PostComment('Joseph Bergren', 'nvdfhbhj', new Date()),
    new PostComment('Sophie Krzywda', 'nvdfhbhj', new Date()),
  ];

  fetchComments() {
    return this.comments.slice();
  }
}
