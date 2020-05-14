import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from './../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth = false;
  userSubscription: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').subscribe(
      (user) => {
        this.isAuth = !user.user ? false : true;
      }
    );
  }

  onSaveData() {
    this.dataStorage.storeRecipe();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  logOutUser() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
