import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [{ path: '', component: PostsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
