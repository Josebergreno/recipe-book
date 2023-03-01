import { Ingredient } from './ingredient.model';
import { Instruction } from './instruction.model';
export class Recipe {
  constructor(
    private ingredients: Ingredient[],
    private recipeName: string,
    private desc: string,
    private instructions: Instruction[],
    private conclusion: string,
    private author: string
  ) {}
}
