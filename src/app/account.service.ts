import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private storage: Storage;

  constructor() { 
    this.storage = window.localStorage;
  }

  account: Account

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  get(key: string): any {
    if (this.storage) {
      return this.storage.getItem(key);
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

  authenticatedUser(): boolean {
    if (this.storage.length > 0){
      return true;
    }
    else {
      return false;
    }
  }

}

export class Account {
  constructor() { }

  public user: string;
  public name: string;
}