import { inject, InjectionToken, Provider } from '@angular/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CurrentUserService } from './current-user.service';
import { UserStateService } from './user-state.service';
import { User } from './user.interface';

export const CURRENT_USER_DASHBOARD_STATE = new InjectionToken<any>(
  'A stream with current user information'
);
//По этому токену будет идти стрим с необходимой компонентам информацией о текущем юзере

export const USER_PROVIDERS: Provider[] = [
  {
    provide: CURRENT_USER_DASHBOARD_STATE,
    deps: [CurrentUserService, UserStateService],
    useFactory: currentUserState,
  },
];

export function currentUserState(
  CurrentUserService: CurrentUserService,
  UserStateService: UserStateService
) {
  return CurrentUserService.currentUser$.pipe(
    switchMap((user) => {
      UserStateService.getUserState(user);
      return UserStateService.userState$;
    })
  );
}
