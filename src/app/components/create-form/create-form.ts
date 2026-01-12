import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Option } from './option/option';

@Component({
  selector: 'app-create-form',
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    MatIcon,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    Option,
  ],
  templateUrl: './create-form.html',
  styleUrl: './create-form.scss',
})
export class CreateForm {
  public conditionOptions: { label: string; value: string }[] = [];
  public questions: { label: string; value: string }[] = [];

  public form: FormGroup = this.initializeForm();
  public questionOrder: string = 'Q-003';

  get conditions(): FormArray {
    return this.form.get('conditions') as FormArray;
  }

  get options(): FormArray<FormGroup> {
    return this.form.get('question')?.get('options') as FormArray<FormGroup>;
  }

  addCondition(): void {
    this.conditions.push(this.createCondition());
  }

  addOption(): void {
    this.options.push(this.createOption());
  }

  removeCondition(index: number): void {
    if (this.conditions.length > 1) {
      this.conditions.removeAt(index);
    }
  }

  isLast(index: number): boolean {
    return index === this.conditions.length - 1;
  }

  private initializeForm(): FormGroup {
    return new FormGroup({
      conditions: new FormArray([this.createCondition()]),
      question: new FormGroup({
        order: new FormControl(this.questionOrder),
        title: new FormControl<string>('', Validators.required),
        options: new FormArray([this.createOption()]),
      }),
    });
  }

  private createCondition(): FormGroup {
    return new FormGroup({
      option: new FormControl<string>('', Validators.required),
      type: new FormControl<string>('', Validators.required),
      target: new FormControl<string>('', Validators.required),
    });
  }

  private createOption(): FormGroup {
    return new FormGroup({
      label: new FormControl<string>('', Validators.required),
      isFlag: new FormControl<boolean>(false, Validators.required),
      comment: new FormControl<string>('', Validators.required),
      points: new FormControl<number | null>(null, Validators.required),
    });
  }
}
