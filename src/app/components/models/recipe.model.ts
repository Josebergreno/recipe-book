import { Ingredient } from './ingredient.model';
export class Recipe {
  constructor(
    private ingredients: Ingredient[],
    private title: string,
    private desc: string,
    private author: string
  ) {}
}
