import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { DeclarativePostService } from './../../services/declarativepost.service';
import { IPost } from './../../models/IPost';

@Component({
  selector: 'app-alt-posts',
  templateUrl: './alt-posts.component.html',
  styleUrls: ['./alt-posts.component.scss'],
})
export class AltPostsComponent implements OnInit {
  posts$ = this.postService.posts$;
  selectedPost$ = this.postService.post$;

  onSelectPost(post: IPost, event: Event) {
    event.preventDefault();
    post.id && this.postService.selectPost(post.id);
  }

  constructor(private postService: DeclarativePostService) {}

  ngOnInit(): void {}
}
