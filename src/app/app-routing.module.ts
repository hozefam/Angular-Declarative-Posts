import { RouterModule, Routes } from '@angular/router';

import { AltPostsComponent } from './pages/alt-posts/alt-posts.component';
import { DeclartivePostsComponent } from './pages/declartive-posts/declartive-posts.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: 'declarativeposts',
    component: DeclartivePostsComponent,
  },
  {
    path: 'altposts',
    component: AltPostsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
