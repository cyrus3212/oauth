import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  email: string;
  password: string;
  user: string;

  constructor(public authService: AuthService) {}

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => { 
        console.log(res);
        this.user = res.user.displayName;
      })
    .catch((err) => console.log(err));
  }

  logout() {
    this.authService.logout();
  }
}
