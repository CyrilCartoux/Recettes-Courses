import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromApp from './../../store/app.reducer';
import * as AuthActions from './../store/auth.actions';

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
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form: NgForm) {
  this.isLoading = true;
  let authObs: Observable<AuthResponseData>;

  if (this.isLoginMode) {
    // authObs = this.authService.signIn(form);
    this.store.dispatch(new AuthActions.LoginStart({
      email: form.value.email,
      password: form.value.password
    }));
  } else {
    authObs = this.authService.signup(form.value.email, form.value.password);
  }

  // authObs.subscribe(
  //   (resData) => {
  //     this.isLoading = false;
  //     console.log(resData);
  //     this.router.navigate(['/recettes']);
  //   },
  //   (errorMessage) => {
  //     this.error = errorMessage;
  //     this.isLoading = false;
  //   }
  // );

  form.reset();
}

closeErrorModal() {
  this.error = null;
}

}

