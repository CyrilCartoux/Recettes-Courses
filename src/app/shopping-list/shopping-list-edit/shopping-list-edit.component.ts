import { Subscription } from 'rxjs';
import { ShoppinglistService } from '../services/shopping-list.service';
import { Ingredients } from './../../shared/ingredients.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem() {
    const ingName = this.ingredientForm.value.name;
    const ingAmount = this.ingredientForm.value.amount;
    const newIngredient = new Ingredients(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }

  onEmptyShoppingList() {
    this.slService.deleteAllIngredients();
  }



}
