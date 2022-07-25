import {
  ChangeDetectorRef,
  Directive,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import {
  Observable,
  of,
  Subject,
  throwError,
  distinctUntilChanged,
} from "rxjs";
import { catchError, delay, takeUntil, tap } from "rxjs/operators";

@Directive({
  selector: "[asyncData]",
})
export class AsyncDataDirective implements OnInit, OnDestroy {
  constructor(
    @Inject(ViewContainerRef)
    private readonly viewContainerRef: ViewContainerRef,
    @Inject(TemplateRef) private readonly templateRef: TemplateRef<any>,
    private readonly cdr: ChangeDetectorRef
  ) {}

  @Input("asyncData")
  private set isData(currentData$: Observable<any>) {
    this.initCurrentData(currentData$, this.subDestroy$);
  }

  @Input("asyncDataPlaceholder")
  private readonly placeholder?: TemplateRef<any>;

  @Input("asyncDataFallback")
  private readonly fallBack?: string = "Error. Try later";

  private readonly subDestroy$ = new Subject();

  ngOnInit() {
    if (!this.isData && this.placeholder) {
      this.viewContainerRef.createEmbeddedView(this.placeholder);
    }
  }

  private initCurrentData(
    currentData$: Observable<any>,
    subDestroy$: Observable<any>
  ) {
    currentData$
      .pipe(
        delay(2000),
        catchError((err) => {
          console.log("caught error and rethrowing farther", err);
          return throwError(() => new Error(err));
        }),
        catchError(() => {
          // console.log("caught error and return fallback value");
          return of([{ title: this.fallBack }]);
        }),
        distinctUntilChanged(),
        tap(() => this.cdr.markForCheck()),
        takeUntil(subDestroy$)
      )
      .subscribe((data) => {
        this.viewContainerRef.clear();
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
          $implicit: data.length ? data : [{ title: 'Nothing found'}],
        });
      });
  }

  ngOnDestroy() {
    this.subDestroy$.next("");
    this.subDestroy$.complete();
  }
}
