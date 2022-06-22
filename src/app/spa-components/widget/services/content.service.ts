import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IRequestParameters } from '../interfaces/interfaces';

export type IContentServiceResponse<T> = {
  [key in keyof T]: T[key];
};
export interface responseData {
  [x: string]: string;
}
export type interfacesAdapter<D extends object, C extends object> = new (arg0: {
  [key in keyof D]: D[key];
}) => C;

export abstract class Adapter {
  [key: string]: string;
  constructor() {}
}



@Injectable()
export class ContentService {
  private requestParameters = {} as IRequestParameters ;

  private contentAdapter = class Adapter {
    [key: string]: string;
    constructor() {}
  }

  private responseAdapter: any;

  constructor(private http: HttpClient) {}

  public getContentFromApi< ResultType>(): Observable< ResultType extends infer R? R : never> {
    return this.http
      .request(
        this.requestParameters.method,
        this.requestParameters.url,
        this.requestParameters.options
      )
      .pipe(
        map((responseData) => {
          if (this.responseAdapter) {
            return this.adaptResponse(responseData, this.responseAdapter);
          }
          return responseData;
        }),

        map((responseData) => {
          if (this.contentAdapter) {
            return Object.keys(responseData).map((key) =>
              this.adaptContent(responseData[key], this.contentAdapter)
            );
          }
          return responseData;
        })
      );
  }

  private adaptContent<D extends object, C extends object>(
    responseData: D,
    contentAdapter: interfacesAdapter<D, C>
  ) {
    return new contentAdapter(responseData);
  }

  private adaptResponse<S extends string, A extends Function>(
    responseData: S, responseAdapter: A
    ): S {
    return responseAdapter(responseData);
  }

  public setContentAdapter(adapterConfig: any): void {
    this.contentAdapter = adapterConfig;
  }

  public setResponseAdapter(responseConfig: any): void {
    this.responseAdapter = responseConfig;
  }

  public setSearchParameters<T extends {}>(queryData: T ): void {
    this.requestParameters.options.params = new HttpParams({ fromObject: queryData})
  }

  public setRequestParameters(requestConfig: IRequestParameters): void {
    this.requestParameters = requestConfig;
  }

  public getSearchParameters() {
    return this.requestParameters.options.params
  }
}
