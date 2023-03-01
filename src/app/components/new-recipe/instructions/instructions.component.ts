import { Component } from '@angular/core';
import { Instruction } from '../../models/instruction.model';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent {
  instructionsList: Instruction[] = [];
  @Input() parentForm!: FormGroup;
  onItemDelete(event: any) {
    const arrayIndex = event.target.parentElement.children[0].id;
    this.instructionsList.splice(arrayIndex, 1);
  }
  onStepAdd() {
    console.log('step added');
  }
}
