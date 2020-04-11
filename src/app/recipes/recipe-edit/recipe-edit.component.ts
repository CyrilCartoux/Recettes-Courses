import { RecipeService } from './../services/recipe.service';
import { FormGroup, FormControl, FormArray, Form, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
    private recipeService: RecipeService
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

  onSubmit() {
    console.log(this.addRecetteForm);
  }

  onAddIngredient() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required)
      })
    );
  }


}
