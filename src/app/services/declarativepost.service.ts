import {
  Subject,
  catchError,
  combineLatest,
  map,
  share,
  shareReplay,
  throwError,
} from 'rxjs';

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
      }),
      catchError(this.handleError),
      share()
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
    }),
    catchError(this.handleError)
  );

  private selectedPostSubject = new Subject<string>();
  selectedPostAction$ = this.selectedPostSubject.asObservable();

  post$ = combineLatest([
    this.postsWithCategory$,
    this.selectedPostAction$,
  ]).pipe(
    map(([posts, selectedPostId]) => {
      return posts.find((post) => post.id === selectedPostId);
    }),
    catchError(this.handleError)
  );

  selectPost(postId: string) {
    this.selectedPostSubject.next(postId);
  }

  constructor(
    private http: HttpClient,
    private categoryService: DeclarativeCategoryService
  ) {}

  handleError(error: Error) {
    return throwError(() => {
      return 'Unknown error occurred. Please try again.';
    });
  }
}
