import { Injectable } from '@angular/core';
import { Instruction } from '../models/instruction.model';
@Injectable({
  providedIn: 'root',
})
export class InstructionsService {
  instructionsList: Instruction[] = [];
  constructor() {}
  deleteInstruction(event: any) {
    const arrayIndex = event.target.parentElement.children[0].id;
    this.instructionsList.splice(arrayIndex, 1);
  }
  addInstruction(step: Instruction) {
    this.instructionsList.push(step);
  }

  getInstructions() {
    return this.instructionsList.slice();
  }
}
