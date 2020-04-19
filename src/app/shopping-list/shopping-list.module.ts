import { ShoppingListRoutingModule } from './shopping-list.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports: [
        ShoppingListRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ShoppingListModule {

}
