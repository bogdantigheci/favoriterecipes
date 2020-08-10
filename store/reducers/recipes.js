import { RECIPES } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/recipes';

const initialState = {
  recipes: RECIPES,
  filteredRecipes: RECIPES,
  favoriteRecipes: [],
};

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteRecipes.findIndex(
        (recipe) => recipe.id === action.recipeId
      );
      if (existingIndex >= 0) {
        const updatedFavRecipes = [...state.favoriteRecipes];
        updatedFavRecipes.splice(existingIndex, 1);
        return { ...state, favoriteRecipes: updatedFavRecipes };
      } else {
        const recipe = state.recipes.find(
          (recipe) => recipe.id === action.recipeId
        );
        return {
          ...state,
          favoriteRecipes: state.favoriteRecipes.concat(recipe),
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredRecipes = state.recipes.filter((recipe) => {
        if (appliedFilters.glutenFree && !recipe.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !recipe.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegan && !recipe.isVegan) {
          return false;
        }
        if (appliedFilters.vegetarian && !recipe.isVegetarian) {
          return false;
        }
        return true;
      });
      return { ...state, filteredRecipes: updatedFilteredRecipes };
    default:
      return state;
  }
};

export default recipes;
