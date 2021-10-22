import { Observable, map, mergeMap } from 'rxjs';

import { CategoryService } from './category.service';
import { HttpClient } from '@angular/common/http';
import { IPost } from './../models/IPost';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

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

  public getPostsWithCategory() {
    return this.getPosts().pipe(
      mergeMap((posts) => {
        return this.categoryService.getCategories().pipe(
          map((categories) => {
            return posts.map((post) => {
              return {
                ...post,
                categoryName: categories.find(
                  (category) => category.id === post.categoryId
                )?.title,
              };
            });
          })
        );
      })
    );
  }
}
