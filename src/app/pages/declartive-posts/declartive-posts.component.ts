import { BehaviorSubject, Subject, combineLatest, map } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { CategoryService } from './../../services/category.service';
import { DeclarativeCategoryService } from './../../services/declarativecategory.service';
import { DeclarativePostService } from './../../services/declarativepost.service';

@Component({
  selector: 'app-declartive-posts',
  templateUrl: './declartive-posts.component.html',
  styleUrls: ['./declartive-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclartivePostsComponent implements OnInit {
  selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable();

  posts$ = this.postService.postsWithCategory$;
  category$ = this.categoryService.categories$;

  filteredPosts$ = combineLatest([
    this.posts$,
    this.selectedCategoryAction$,
  ]).pipe(
    map(([posts, selectedCategoryId]) => {
      return posts.filter((post) =>
        selectedCategoryId !== ''
          ? post.categoryId === selectedCategoryId
          : true
      );
    })
  );

  onCategoryChange(event: Event) {
    this.selectedCategorySubject.next(
      (event.target as HTMLSelectElement).value
    );
  }

  constructor(
    private postService: DeclarativePostService,
    private categoryService: DeclarativeCategoryService
  ) {}

  ngOnInit(): void {}
}
