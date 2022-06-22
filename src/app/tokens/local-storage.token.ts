import { inject, InjectionToken } from '@angular/core';

import { WINDOW } from './app-tokens-list';

export const LOCAL_STORAGE = new InjectionToken<Storage>('localStorage', {
  factory: () => inject(WINDOW).localStorage,
});
