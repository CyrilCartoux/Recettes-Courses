import { ShoppinglistService } from '../services/shopping-list.service';
import { Ingredients } from './../../shared/ingredients.model';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  constructor(private slService: ShoppinglistService) { }

  ngOnInit() {
  }

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = +this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredients(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }
}
