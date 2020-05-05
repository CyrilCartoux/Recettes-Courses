import { DataStorageService } from './../../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { RecipeService } from './../services/recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  resultat: Recipe[];
  content: string;
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private dataService: DataStorageService
  ) { }

  ngOnInit() {
    this.dataService.fetchRecipes().subscribe(() => {});
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.resultat = recipes;
      }
    );

    this.recipes = this.recipeService.getRecipes();
    this.resultat = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onSearchRecipe() {
    if (this.content) {
      this.resultat = this.resultat.filter(elt => elt.name.includes(this.content));
    } else {
      this.resultat = this.recipes;
    }
  }
}
