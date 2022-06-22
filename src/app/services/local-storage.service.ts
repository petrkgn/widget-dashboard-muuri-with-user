import { Injectable, Inject } from '@angular/core';
import {LOCAL_STORAGE, WINDOW} from '../tokens/app-tokens-list'

@Injectable({providedIn: 'root'})
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private readonly localStorage: Storage,
    @Inject(WINDOW) private readonly windowRef: Window,
  ) { }

  get length(): number {
    return this.localStorage.length;
  }

  clear(): void {
    this.localStorage.clear();
    this.notify(null, null, null);
  }

  getItem(key: string): string | null {
    return this.localStorage.getItem(key);
  }

  key(index: number): string | null {
    return this.localStorage.key(index);
  }

  removeItem(key: string): void {
    const oldValue = this.getItem(key);

        this.localStorage.removeItem(key);
        this.notify(key, null, oldValue);
  }

  setItem(key: string, value: string): void {
    const oldValue = this.getItem(key);
    this.localStorage.setItem(key, value);
    this.notify(key, value, oldValue);
  }

  private notify(key: string | null, newValue: string | null, oldValue: string | null) {
    const event = new StorageEvent('storage', {
        key,
        newValue,
        oldValue,
        storageArea: this.localStorage,
        url: this.windowRef.location.href,
    });

    this.windowRef.dispatchEvent(event);
}
}