import { HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

export interface IRequestParameters {
  method: string,
  url:  string,
  params: {},
  options: {
    body?: any,
    headers?: HttpHeaders,
    params?: HttpParams,
    observe?: 'body' | 'response'
    }
};

export interface INewsArticle {
  title: string,
  description?: string,
  imgUrl?: string,
  article: string
  author?: string,
  sourceUrl?: string
};

