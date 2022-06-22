import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.interface';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private currentUser = new BehaviorSubject('user2');
  currentUser$ = this.currentUser.asObservable();

  constructor() {}

  public setCurrentUser(user: string) {
    this.currentUser.next(user);
  }

  public getCarrentUser() {
    // return this.currentUser$ 
    return this.currentUser.getValue();
  }
} 
