import { Ingredient } from './ingredient.model';
import { Instruction } from './instruction.model';
export class Recipe {
  constructor(
    public recipeName: string,
    public imgPath: string,
    public desc: string,
    public ingredients: Ingredient[],
    public instructions: Instruction[],
    public conclusion: string,
    public author?: string
  ) {}
}
