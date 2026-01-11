import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-form',
  imports: [MatSelectModule, ReactiveFormsModule, MatIcon, CommonModule, MatButtonModule],
  templateUrl: './create-form.html',
  styleUrl: './create-form.scss',
})
export class CreateForm {
  public options: { label: string; value: string }[] = [];
  public questions: { label: string; value: string }[] = [];

  public form: FormGroup = this.initializeForm();

  get conditions(): FormArray {
    return this.form.get('conditions') as FormArray;
  }

  addCondition(): void {
    this.conditions.push(this.createCondition());
  }

  removeCondition(index: number): void {
    if (this.conditions.length > 1) {
      this.conditions.removeAt(index);
    }
  }

  isLast(index: number) {
    return index === this.conditions.length - 1;
  }

  private initializeForm() {
    return new FormGroup({
      conditions: new FormArray([this.createCondition()]),
    });
  }

  private createCondition(): FormGroup {
    return new FormGroup({
      option: new FormControl<string>('', Validators.required),
      type: new FormControl<string>('', Validators.required),
      target: new FormControl<string>('', Validators.required),
    });
  }
}
