import { Component, ViewChild, TemplateRef, Output, EventEmitter, Input } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CreateAction, QuestionType } from '@shared/models';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CdkMenuModule, MatIconModule, MatDividerModule],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
})
export class ContextMenu {
  @Input() activeSection: string | null = null;
  @ViewChild('contextMenu', { static: true })

  public contextMenu!: TemplateRef<CdkMenuModule>;
  
  @Output() action = new EventEmitter<CreateAction>();

  createSection() {
    this.action.emit({ type: 'section' });
  }

  createQuestion(type: QuestionType) {
    this.action.emit({ type: 'question', questionType: type });
  }
}
