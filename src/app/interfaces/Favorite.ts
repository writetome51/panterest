import {SpecificRecipe} from './SpecificRecipe';

export interface Favorite {
  name: string; // name should be the recipe_id.
  content: SpecificRecipe;
}
