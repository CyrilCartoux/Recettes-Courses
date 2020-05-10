import { Ingredients } from '../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredients('Pommes', 2),
        new Ingredients('Tomates', 4),
        new Ingredients('Poivrons', 1)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
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
        default: return state;
    }
}
