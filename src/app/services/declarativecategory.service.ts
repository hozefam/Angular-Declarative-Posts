import { DeclarativePostService } from './declarativepost.service';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/ICategory';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeclarativeCategoryService {
  categories$ = this.httpClient
    .get<{ [id: string]: ICategory }>(
      'https://angular-rxjs-posts-b0145-default-rtdb.firebaseio.com/categories.json'
    )
    .pipe(
      map((categories) => {
        let categoriesData: ICategory[] = [];
        for (let id in categories) {
          categoriesData.push({ ...categories[id], id });
        }
        return categoriesData;
      })
    );

  constructor(private httpClient: HttpClient) {}
}
