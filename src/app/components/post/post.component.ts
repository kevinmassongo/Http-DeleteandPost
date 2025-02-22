import { Component, inject } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../services/post.model';
import { EditPostComponent } from '../editPost/edit-post.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, EditPostComponent],
  template: `
      <dialog [open]="showDialog">
        <app-edit-post [post]="post" *ngIf="showDialog"/>  
</dialog>
    <section class="posts-container">
      <div class="post-container"*ngFor="let post of posts | async">
        <h3>{{post.title}}</h3>
        <h4>{{post.body}}</h4>
        <span>Identifiant du post : {{post.id}} - posté par {{post.userId}}</span>
        {{deleteResult | async}}
        <div class="actions" align="end">
          <button class="modifier" (click)="toggleDialog(post)">Editer</button>
          <button class="supprimer" (click)="onDelete(post.id)">Supprimer</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .posts-container{
      width : 70vw;
      margin : auto;
    & > * {
      border : 1px solid gray;
      padding : 1rem;
      margin : 1rem
    }
      }
    button {
      padding : 0.5rem;
      font-size : 1rem;
      margin-left : 1rem;
      cursor : pointer;
      border : none;
      background-color : skyblue;
      font-weight : bold;
    }

    .supprimer {
      background-color : red;
      color : white
    }

    dialog {
      position : sticky;
      top : 0
    }
    `]
})
export class PostComponent {
  showDialog = false;
  post !: Post;
  deleteResult !: Observable<Post>

  private ps = inject(PostService);
  readonly posts = this.ps.getPosts();

  toggleDialog(post: Post) {
    this.showDialog = !this.showDialog;
    this.post = post;
  }

  onDelete(postId: number) {
    this.deleteResult = this.ps.deletePost(postId);
    location.reload()
  }
}
