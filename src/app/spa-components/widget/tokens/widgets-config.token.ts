import { InjectionToken } from '@angular/core';
import { ConfigList } from '../widgets-config/config-list';

export const CONFIG_LIST = new InjectionToken<any>('config.widgets', {
  factory: () => ConfigList,
});
