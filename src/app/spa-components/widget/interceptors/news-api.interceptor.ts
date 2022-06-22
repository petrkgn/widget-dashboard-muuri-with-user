import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class NewsInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('https://newsapi.org')) {
      const newsReq = req.clone({
        url: `https://api.allorigins.win/get?url=${encodeURIComponent(
          req.urlWithParams
        )}`,
      });
      return next.handle(newsReq);
    } else {
      return next.handle(req);
    }
  }
}
@Injectable()
export class WeatherInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
