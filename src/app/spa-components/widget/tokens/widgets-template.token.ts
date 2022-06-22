import { InjectionToken } from '@angular/core';
import { TemplatesList } from '../widget-templates/template-list';

export const TEMPLATES_LIST = new InjectionToken<any>('template.widgets', {
  factory: () => TemplatesList 
});
