import { RecipeService } from './../services/recipe.service';
import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  resultat: Recipe[];
  content: string;

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.resultat = recipes;
      }
    );

    this.recipes = this.recipeService.getRecipes();
    this.resultat = this.recipeService.getRecipes();
  }
  onSearchRecipe() {
    if (this.content) {
      this.resultat = this.resultat.filter(elt => elt.name.includes(this.content));
    } else {
      this.resultat = this.recipes;
    }
  }
}
