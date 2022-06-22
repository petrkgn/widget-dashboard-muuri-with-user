import { Inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from './user.interface';

@Injectable({ providedIn: 'root' })
export class UserStateService implements OnInit {
  private readonly defaultUser: string | null = JSON.stringify({
    id: 'default',
    userState: {
      dashBoardList: [],
    },
  });

  private userState = new BehaviorSubject(this.defaultUser);
  userState$ = this.userState.asObservable();
  // храним локальный stste и измененияв нем при destroy app записываем в основной storage
  private userStateStorage = {};

  constructor(
    @Inject(LocalStorageService) private userStorage: LocalStorageService
  ) {}

  ngOnInit() {
    // this.userStateStorage = this.userStorage.getItem(user);
  }

  getUserState(user: string): void {
    const state = this.userStorage.getItem(user);
    this.userState.next(state);
  }

  // setUserState(user): void {}

  // remuveUserState(user): void {}

  // remuveAllUsersState(): void {}
}
