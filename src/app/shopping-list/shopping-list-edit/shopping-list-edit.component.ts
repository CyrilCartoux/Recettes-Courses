import { ShoppinglistService } from '../services/shopping-list.service';
import { Ingredients } from './../../shared/ingredients.model';
import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  ingName;
  ingAmount;
  ingredientForm: FormGroup;

  constructor(
    private slService: ShoppinglistService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  onAddItem() {
    this.ingName = this.ingredientForm.value.name;
    this.ingAmount = this.ingredientForm.value.amount;
    const newIngredient = new Ingredients(this.ingName, this.ingAmount);
    this.slService.addIngredient(newIngredient);
  }

  onEmptyShoppingList() {
    this.slService.deleteAllIngredients();
  }



}
