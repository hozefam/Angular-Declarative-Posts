import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { IPost } from './../../models/IPost';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  postsSubscription!: Subscription;

  constructor(
    private postService: PostService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.postsSubscription = this.postService
      .getPostsWithCategory()
      .subscribe((data: any) => {
        this.posts = data;
        this.ref.detectChanges();
      });
  }

  ngOnDestroy() {
    this.postsSubscription && this.postsSubscription.unsubscribe();
  }
}
