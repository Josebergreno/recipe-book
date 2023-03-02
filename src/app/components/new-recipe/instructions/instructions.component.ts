import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Instruction } from 'src/app/models/instruction.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  constructor(private router: Router, private recipeService: RecipeService) {}
  instructionsList: Instruction[] = [];
  @ViewChild('formRef') formRef!: NgForm;
  ngOnInit(): void {
    this.instructionsList = this.recipeService.getInstructions();
  }
  onSubmit(formRef: NgForm) {
    console.log();
  }
  resetInstructionInputs() {
    const formRefVal = this.formRef.controls;
    formRefVal['stepDesc'].reset();
    formRefVal['unitOfTime'].reset();
    formRefVal['stepCookTime'].reset();
  }

  onStepAdd(stepCookTime: number, unitOfTime: string, stepDesc: string) {
    this.recipeService.addInstruction(
      new Instruction(stepDesc, stepCookTime, unitOfTime)
    );
    this.instructionsList = this.recipeService.getInstructions();
    this.resetInstructionInputs();
  }

  onInstructionDelete(event: any) {
    this.recipeService.deleteInstruction(event);
    this.instructionsList = this.recipeService.getInstructions();
  }
  onBack() {
    this.router.navigate(['new-recipe', 'ingredients']);
  }
  onNext() {
    this.router.navigate(['new-recipe', 'conclusion']);
  }
}
