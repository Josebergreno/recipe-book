import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Instruction } from 'src/app/models/instruction.model';
import { NgForm } from '@angular/forms';
import { InstructionsService } from 'src/app/services/instructions.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
})
export class InstructionsComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private instructionService: InstructionsService
  ) {}
  instructionsList: Instruction[] = [];
  onSlideOut!: boolean;
  @ViewChild('formRef') formRef!: NgForm;

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
    this.instructionService.addInstruction(
      new Instruction(stepDesc, stepCookTime, unitOfTime)
    );
    this.instructionsList = this.instructionService.getInstructions();
    this.resetInstructionInputs();
  }

  onInstructionDelete(event: any) {
    this.instructionService.deleteInstruction(event);
    this.instructionsList = this.instructionService.getInstructions();
  }
  onBack() {
    this.router.navigate(['new-recipe', 'ingredients']);
  }
  onNext() {
    this.onSlideOut = true;
    setTimeout(() => this.router.navigate(['new-recipe', 'conclusion']), 1000);
  }
  ngOnInit(): void {
    this.instructionsList = this.instructionService.getInstructions();
    this.onSlideOut = false;
  }
  ngOnDestroy(): void {
    this.onSlideOut = false;
  }
}
