import { MessageService } from 'primeng/api';
// Services :
import { RecipeService } from './recipes/services/recipe.service';
import { ShoppinglistService } from './shopping-list/services/shopping-list.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

// Components :
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './shared/alert/alert/alert.component';
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner/loading-spinner.component';

// Modules :
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ShoppingListModule } from './shopping-list/shopping-list.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    ShoppingListModule
  ],
  providers: [ShoppinglistService, RecipeService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
