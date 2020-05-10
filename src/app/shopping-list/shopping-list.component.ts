import { Ingredients } from './../shared/ingredients.model';
import { Component, OnInit, OnDestroy, } from '@angular/core';
import { ShoppinglistService } from './services/shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredients[]}>;
  private subscription: Subscription;

  constructor(
    private shoppingService: ShoppinglistService,
    private store: Store<{ shoppingList: { ingredients: Ingredients[] } }>
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }

}
