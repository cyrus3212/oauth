import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { appRoutes } from './app.route';
import { LoginComponent } from './login/login.component';
import { AngularFirestore } from 'angularfire2/firestore';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
