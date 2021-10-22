import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PostsComponent } from './pages/posts/posts.component';
import { HomeComponent } from './pages/home/home.component';
import { DeclartivePostsComponent } from './pages/declartive-posts/declartive-posts.component';
import { AltPostsComponent } from './pages/alt-posts/alt-posts.component';
import { SinglePostComponent } from './components/single-post/single-post.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PostsComponent, HomeComponent, DeclartivePostsComponent, AltPostsComponent, SinglePostComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
