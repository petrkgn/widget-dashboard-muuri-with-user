import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-widget-action[formModel]',
  templateUrl: './widget-action.component.html',
  styleUrls: ['./widget-action.component.scss'],
})
export class WidgetActionComponent implements OnInit {
  @Input() formModel: any;
  @Output() queryRequest = new EventEmitter<object>();
  public queryData!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initQueryData();
    this.createQueryForm(this.formModel);
  }

  private createQueryForm(formModel: any) {
    if(this.queryData)
    for (let control of formModel) {
      const controlField = new FormControl(control.value);
      this.queryData.addControl(control.name, controlField);
    }
  }

  private initQueryData() {
    this.queryData = this.fb.group({});
  }

  public sendQueryData() {
    this.queryRequest.emit(this.queryData.value);
    //console.log('queryData:', JSON.stringify(this.queryData.value));
  }
}
