import { combineLatest, map } from 'rxjs';

import { CategoryService } from './category.service';
import { DeclarativeCategoryService } from './declarativecategory.service';
import { HttpClient } from '@angular/common/http';
import { IPost } from './../models/IPost';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeclarativePostService {
  posts$ = this.http
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

  postsWithCategory$ = combineLatest([
    this.posts$,
    this.categoryService.categories$,
  ]).pipe(
    map(([posts, categories]) => {
      return posts.map((post) => {
        return {
          ...post,
          categoryName: categories.find(
            (category) => category.id === post.categoryId
          )?.title,
        } as IPost;
      });
    })
  );

  constructor(
    private http: HttpClient,
    private categoryService: DeclarativeCategoryService
  ) {}
}
