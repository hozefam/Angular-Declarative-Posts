import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { IPost } from './../models/IPost';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getPosts() {
    return this.http
      .get<{ [id: number]: IPost }>(
        'https://angular-rxjs-posts-b0145-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((posts) => {
          let postData: IPost[] = [];
          for (let id in posts) {
            postData.push({ ...posts[id], id });
          }
          return postData;
        })
      );
  }
}
