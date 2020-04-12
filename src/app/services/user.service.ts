import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Repo } from '../models/repo';
import { HttpClient } from '@angular/common/http';
import {environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username= 'Waithera-m';
  userUrl: string = 'https://api.github.com/users/waithera-m' + environment.api_key

  user: User;
  repo: Repo;
  

  constructor(private http:HttpClient) {
    
  }

  getUser():Observable<User>{
    return this.http.get<User>(this.userUrl + this.username)
  }
}


  