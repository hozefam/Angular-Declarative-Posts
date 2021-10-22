import { BehaviorSubject, EMPTY, catchError } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { DeclarativePostService } from './../../services/declarativepost.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostComponent implements OnInit {
  errorMessageSubject = new BehaviorSubject<string>('');
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  singlePost$ = this.postService.post$.pipe(
    catchError((error) => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  );

  constructor(private postService: DeclarativePostService) {}

  ngOnInit(): void {}
}
