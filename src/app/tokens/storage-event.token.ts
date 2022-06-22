import {inject, InjectionToken} from '@angular/core';
import {WINDOW} from './app-tokens-list';
import {fromEvent, Observable} from 'rxjs';

export const STORAGE_EVENT = new InjectionToken<Observable<StorageEvent>>(
    'All changes to Storage',
    {
        factory: () => fromEvent<StorageEvent>(inject(WINDOW), 'storage'),
    },
);