import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { User } from '../interfaces/user.interface';
import { TokinStorageService } from './tokin-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }
  login(username:string,password:string):Observable<User>{
    return this.httpClient.post<User>('https://dummyjson.com/auth/login',{username,password})
  }
}
