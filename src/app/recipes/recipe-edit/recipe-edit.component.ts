import { Recipe } from './../recipe.model';
import { RecipeService } from './../services/recipe.service';

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  idToEdit: number;
  editMode = false;

  addRecetteForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Get id in route :
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.idToEdit = +param.id;
        this.editMode = param.id ? true : false;
        this.initForm();
      }
    );

  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.idToEdit);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.desc;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, Validators.required)
            })
          );
        }
      }
    }

    this.addRecetteForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  get ingredients() {
    return this.addRecetteForm.get('ingredients') as FormArray;
  }

  deleteIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  onSubmit() {
    const newRecipe = new Recipe(this.addRecetteForm.value.name,
      this.addRecetteForm.value.description,
      this.addRecetteForm.value.imagePath,
      this.addRecetteForm.value.ingredients);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.idToEdit, newRecipe);
      this.addRecetteForm.reset();
    } else {
      this.recipeService.addRecipe(newRecipe);
      this.addRecetteForm.reset();
    }

    this.onCancelEdit();
  }

  onAddIngredient() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required)
      })
    );
  }

  onCancelEdit() {
    this.location.back();
  }

}
