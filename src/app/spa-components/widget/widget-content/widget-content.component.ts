import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MuuriGridService } from '../../../services/muuri-grid.service';
import { IRequestParameters } from '../interfaces/interfaces';
import { ContentService } from '../services/content.service';
import { TEMPLATES_LIST, CONFIG_LIST } from '../tokens/widgets-tokens-list';

export interface WidgetConfig {
  [key: string]: {
    title: string;
    staticContent: false;
    requestConfig: IRequestParameters;
    responseConfig: <T extends string>(
      arg0: T
    ) => T extends infer R ? R : never;
    contentAdapter: any;
    formActionModel: any;
  };
}

@Component({
  selector: 'app-widget',
  templateUrl: './widget-content.component.html',
  styleUrls: ['./widget-content.component.scss'],
  host: { class: 'widget' },
  providers: [ContentService],
})
export class WidgetComponent implements OnInit {
  public widgetContext: string = '';

  private widgetConfig = {} as WidgetConfig[keyof WidgetConfig];

  public widgetActionModel = {};

  public cashedQueryData: { [x: string]: string } | undefined;

  public widgetTitle: string = '';

  public currentContent: Observable<any> = of({});

  public widgetTemplate: any;

  constructor(
    @Inject(CONFIG_LIST) private readonly config: WidgetConfig,
    @Inject(TEMPLATES_LIST) private readonly template: { [x: string]: any },
    private readonly gridService: MuuriGridService,
    private readonly content: ContentService,
    private readonly hostRef: ElementRef
  ) {}

  ngOnInit() {
    this.initWidgetConfig();
    this.initWidgetTitle();
    this.initRequestParametrs();
    this.initResponseAdapter();
    this.initContentAdapter();
    this.initWidgetActionModel();
    this.initWidgetTemplate();
    this.getCurrentContent();
  }

  private initWidgetConfig(): void {
    this.widgetConfig = { ...this.config[this.widgetContext] };
  }

  private initWidgetTitle(): void {
    this.widgetTitle = this.widgetConfig.title;
  }

  private initRequestParametrs(): void {
    const requestConfig = this.widgetConfig.requestConfig;
    this.content.setRequestParameters(requestConfig);
    !this.cashedQueryData && (this.cashedQueryData = requestConfig.params);
  }

  private initResponseAdapter(): void {
    const responseConfig = this.widgetConfig.responseConfig;
    this.content.setResponseAdapter(responseConfig);
  }

  private initContentAdapter(): void {
    const adapterConfig = this.widgetConfig.contentAdapter;
    this.content.setContentAdapter(adapterConfig);
  }

  private initWidgetTemplate(): void {
    // this.widgetTemplate = swithCaseMap(this.template, this.widgetContext);
    this.widgetTemplate = this.template[this.widgetContext];
  }

  private initWidgetActionModel(): void {
    this.widgetActionModel = this.widgetConfig.formActionModel;
  }

  public getContentWitchQueryData(queryData: {}): void {
    if (JSON.stringify(this.cashedQueryData) !== JSON.stringify(queryData)) {
      this.cashedQueryData = queryData;
      this.getCurrentContent();
    }
  }

  private getCurrentContent(): void {
    if (this.widgetConfig.staticContent) {
      this.currentContent = this.widgetConfig.staticContent;
    } else {
      if (this.cashedQueryData) {
        this.content.setSearchParameters(this.cashedQueryData);

        this.currentContent = this.content.getContentFromApi();
      }
    }
  }

  public destroyWidget(): void {
    this.gridService.removeItemFromGrid(this.hostRef.nativeElement);
  }
}
