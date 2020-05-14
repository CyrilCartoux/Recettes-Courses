import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ShoppinglistService } from '../services/shopping-list.service';
import { Ingredients } from './../../shared/ingredients.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from './../../store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  ingredientForm: FormGroup;
  private subscription: Subscription;

  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredients;

  constructor(
    private slService: ShoppinglistService,
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.editedItemIndex = stateData.editedIngredientIndex;
        this.ingredientForm.patchValue(this.editedItem);
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem() {
    const ingName = this.ingredientForm.value.name;
    const ingAmount = this.ingredientForm.value.amount;
    const newIngredient = new Ingredients(ingName, ingAmount);

    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({
        index: this.editedItemIndex,
        ingredient: newIngredient
      }));
      this.editMode = false;
      this.ingredientForm.reset();
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      this.ingredientForm.reset();
    }
  }

  onEmptyShoppingList() {
    // this.slService.deleteAllIngredients();
    this.store.dispatch(new ShoppingListActions.DeleteAllIngredients());
  }

  deleteIngredient() {
    // this.slService.deleteOneIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.editMode = false;
    this.ingredientForm.reset();
  }


}
