import { Component, OnDestroy, OnInit } from '@angular/core';

import { IPost } from './../../models/IPost';
import { PostService } from './../../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  postsSubscription!: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postsSubscription = this.postService
      .getPosts()
      .subscribe((data: any) => {
        this.posts = data;
      });
  }

  ngOnDestroy() {
    this.postsSubscription && this.postsSubscription.unsubscribe();
  }
}
