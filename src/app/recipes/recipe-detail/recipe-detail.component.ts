import { Recipe } from './../recipe.model';
import { RecipeService } from './../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.recipeId = +param.id;
        this.recipe = this.recipeService.getRecipeById(this.recipeId);
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.router.navigate(['/shopping']);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['recettes']);
  }
}
