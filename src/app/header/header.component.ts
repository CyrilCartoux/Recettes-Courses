import { Subscription } from 'rxjs';
import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      (user) => {
        this.isAuth = !user ? false : true;
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
