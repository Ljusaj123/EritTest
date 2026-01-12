import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  templateUrl: './option.html',
  styleUrl: './option.scss',
})
export class Option {
  @Input() type: string = '';
  @Input({ required: true }) formGroup!: FormGroup;
}
