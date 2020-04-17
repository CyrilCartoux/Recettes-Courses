import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;

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
    if (this.isLoginMode) {
      //
    } else {
      this.authService.signUp(form).subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }

}
