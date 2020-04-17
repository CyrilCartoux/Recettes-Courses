import { AuthService, AuthResponse } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  isLoggedIn = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form: NgForm) {
  this.isLoading = true;
  let authObs: Observable<AuthResponse>;

  if (this.isLoginMode) {
    authObs = this.authService.signIn(form);
  } else {
    authObs = this.authService.signUp(form);
  }

  authObs.subscribe(
    (resData) => {
      this.isLoading = false;
      console.log(resData);
    },
    (errorMessage) => {
      this.error = errorMessage;
      this.isLoading = false;
    }
  );

  form.reset();
}

}

