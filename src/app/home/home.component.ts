import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Post {
  title: string;
  content: string;
}
interface PostId extends Post { 
  id: string; 
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  postsCol: AngularFirestoreCollection<Post>;
  posts: any;
  postDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post>;

  users:any;
  user: any;
  sub:any;

  constructor(
    public authService: AuthService,
    public router: Router,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
      this.afAuth.authState.subscribe(
        (auth) => {
          this.user = auth;
        });

    }

  ngOnInit() {
    this.getUser();
    this.postsCol = this.afs.collection('posts');
    // this.postsCol = this.afs.collection('posts', ref => ref.where('title', '==', 'coursetro'));
    // this.posts = this.postsCol.valueChanges();

    this.posts = this.postsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  title:string;
  content:string;

  getUser() {
    console.log('testing...');
  }

  addPost() {
    this.afs.collection('posts').add({
      'content': this.content,
      'username': this.user.displayName,
      'photo': this.user.photoURL
    });
  }

  getPost(postId) {
    this.postDoc = this.afs.doc('posts/'+postId);
    this.post = this.postDoc.valueChanges();
  }

  deletePost(postId) {
    this.afs.doc('posts/'+postId).delete();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
