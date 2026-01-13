import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Option } from './option/option';
import { QuestionnareService } from '@core/questionnare.service';

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
  @Input() questionOrder: string = 'Q-003';
  @Input() sectionOrder: string = 'S-003';

  public conditionOptions: { label: string; value: string }[] = [];
  public questions: { label: string; value: string }[] = [];

  public form: FormGroup = this.initializeForm();
  public sectionOrders: string[] = [];
  public questionOrders: string[] = [];

  get conditions(): FormArray {
    return this.form.get('conditions') as FormArray;
  }

  get options(): FormArray<FormGroup> {
    return this.form.get('question')?.get('options') as FormArray<FormGroup>;
  }

getAvailableConditionOptions(index: number): string[] {
  const usedOptions = this.conditions.controls
    .map((condition, i) =>
      i !== index ? condition.get('option')?.value : null
    )
    .filter(Boolean);

  return this.options.controls
    .map(option => option.get('label')?.value)
    .filter(label => !usedOptions.includes(label));
}


  constructor(private questionnareService: QuestionnareService) {
    this.sectionOrders = this.questionnareService.getAllSectionOrders();
    this.questionOrders = this.questionnareService.getQuestionOrdersBySection(this.sectionOrder);
  }

  getTargetsForCondition(index: number) {
    const type = this.conditions.at(index).get('type')?.value;

    if (type === 'section') {
      return this.sectionOrders;
    }

    if (type === 'question') {
      return this.questionOrders;
    }

    return [];
  }

  addCondition(): void {
    this.conditions.push(this.createCondition());
  }

  addOption(): void {
    const index = this.options.length + 1;
    this.options.push(this.createOption(`Option ${index}`));
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
        options: new FormArray([this.createOption(`Option 1`)]),
      }),
    });
  }

  private createCondition(): FormGroup {
    const group = new FormGroup({
      option: new FormControl<string>('', Validators.required),
      type: new FormControl<'section' | 'question' | null>(null, Validators.required),
      target: new FormControl<string>('', Validators.required),
    });

    group.get('type')!.valueChanges.subscribe(() => {
      group.get('target')!.reset();
    });

    return group;
  }

  private createOption(label: string = ''): FormGroup {
    return new FormGroup({
      label: new FormControl<string>(label, Validators.required),
      isFlag: new FormControl<boolean>(false, Validators.required),
      comment: new FormControl<string>('', Validators.required),
      points: new FormControl<number | null>(null, Validators.required),
    });
  }
}
