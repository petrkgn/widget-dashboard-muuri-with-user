
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WidgetComponent } from '../../widget-content/widget-content.component';

@Component({
  selector: 'app-news-template',
  templateUrl: './news-template.component.html',
  styleUrls: ['./news-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsTemplateComponent {
  currentContent$: Observable<any>
  constructor(public widget: WidgetComponent) {
    this.currentContent$ = widget.currentContent
  }
}
