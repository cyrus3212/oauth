import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  email: string;
  password: string;
  user: string;
  userPhoto: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
  }

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
        this.authService.loggedInUser = res.user;
        this.router.navigate(['home']);
      })
    .catch((err) => console.log(err));
  }

  

}
