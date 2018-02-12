import {SearchResultRecipe} from './SearchResultRecipe';

export interface SearchResult {
  count: number;
  recipes: SearchResultRecipe[];
}
