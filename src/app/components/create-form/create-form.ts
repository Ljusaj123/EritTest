import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Option } from './option/option';
import { QuestionnareService } from '@core/questionnare.service';
import { AnswerOption, Condition, Question, QuestionType } from '@shared/models';

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
  @Input() questionId: string = '';
  @Input() sectionId: string = '';
  @Input() type: QuestionType = '';

  public conditionOptions: { label: string; value: string }[] = [];
  public questions: { label: string; value: string }[] = [];

  public form: FormGroup = this.initializeForm();
  public sectionIds: string[] = [];
  public questionIds: string[] = [];

  get conditions(): FormArray {
    return this.form.get('conditions') as FormArray;
  }

  get options(): FormArray<FormGroup> {
    return this.form.get('question')?.get('options') as FormArray<FormGroup>;
  }

  constructor(private questionnareService: QuestionnareService) {
    this.sectionIds = this.questionnareService.getAllSectionIds();
  }

  ngOnInit() {
    this.questionnareService.activeQuestion$.subscribe((question) => {
      if (!question) return;

      this.patchForm(question);
    });

    this.form.valueChanges.subscribe((value) => {
      this.questionnareService.updateActiveQuestion({
        label: value.question.title,
        answers: value.question.options,
        conditions: value.conditions,
      });
    });
  }

  getAvailableConditionOptions(index: number): string[] {
    const usedOptions = this.conditions.controls
      .map((condition, i) => (i !== index ? condition.get('option')?.value : null))
      .filter(Boolean);

    return this.options.controls
      .map((option) => option.get('label')?.value)
      .filter((label) => !usedOptions.includes(label));
  }

  hasOptions(type: QuestionType): boolean {
    return ['multiple', 'check-boxes', 'drop-down'].includes(type);
  }

  handleSelection(index: number) {
    const type = this.conditions.at(index).get('type')?.value;

    if (type === 'question') {
      this.questionIds = this.questionnareService.getQuestionIdsBySection(this.sectionId);
    }
  }

  getTargetsForCondition(index: number) {
    const type = this.conditions.at(index).get('type')?.value;

    if (type === 'section') {
      return this.sectionIds;
    }

    if (type === 'question') {
      return this.questionIds;
    }

    return [];
  }

  addCondition(): void {
    this.conditions.push(this.createCondition());
  }

  addOption(): void {
    this.options.push(this.createOption(`Option ${this.options.length + 1}`));
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
        title: new FormControl<string>('', Validators.required),
        options: new FormArray([this.createOption()]),
      }),
    });
  }

  private createCondition(): FormGroup {
    return new FormGroup({
      answerId: new FormControl<string>('', Validators.required),
      type: new FormControl<'section' | 'question' | null>(null, Validators.required),
      target: new FormControl<string>('', Validators.required),
    });
  }

  private createOption(label: string = ''): FormGroup {
    return new FormGroup({
      label: new FormControl<string>(label, Validators.required),
      isFlag: new FormControl<boolean>(false, Validators.required),
      comment: new FormControl<string>('', Validators.required),
      points: new FormControl<number | null>(null, Validators.required),
    });
  }

  private patchForm(question: Question) {
    this.form.reset();

    this.form.get('question.title')?.setValue(question.label);

    this.options.clear();

    question.answers.forEach((answer: AnswerOption) => {
      this.options.push(
        new FormGroup({
          label: new FormControl(answer.label, Validators.required),
          isFlag: new FormControl(answer.isFlag ?? false),
          comment: new FormControl(answer.comment ?? ''),
          points: new FormControl(answer.points ?? null),
        })
      );
    });

    this.conditions.clear();

    (question.conditions ?? []).forEach((condition: Condition) => {
      this.conditions.push(
        new FormGroup({
          answerId: new FormControl(condition.answerId),
          type: new FormControl(condition.type),
          target: new FormControl(condition.target),
        })
      );
    });
  }
}
