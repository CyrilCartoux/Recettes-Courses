import { Ingredients } from '../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';


export interface State {
    ingredients: Ingredients[];
    editedIngredient: Ingredients;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredients('Pommes', 2),
        new Ingredients('Tomates', 4),
        new Ingredients('Poivrons', 1)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                // always copy the old state !
                ...state,
                // then overwrite what you wanna change
                ingredients: [...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                // always copy the old state !
                ...state,
                // then overwrite what you wanna change
                ingredients: [...state.ingredients, ...action.payload]
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            // ingredient to update
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients
            };

        case ShoppingListActions.DELETE_INGREDIENT:

            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== action.payload;
                })
            };

        case ShoppingListActions.DELETEALL_INGREDIENTS:
            return {
                // always copy the old state !
                ...state,
                // then overwrite what you wanna change
                ingredients: []
            };

        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default: return state;
    }
}
