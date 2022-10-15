import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

const USER_KEY='auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokinStorageService {

  constructor() { }
  setUser(user:User):void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(user));
  }
  getUser():User|null{
    let user:string|null= window.sessionStorage.getItem(USER_KEY);
    if(user) return JSON.parse(user);
    return null;
  }
  signOut():void{
    window.sessionStorage.clear();
  }
}
