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
 
  private username='Waithera-m';

  userUrl: string = 'https://api.github.com/users/'

  user: User;
  repo: Repo;
  

  constructor(private http:HttpClient) {
    this.username = '';
    this.user = new User("", 0, 0, "", 0, "");
  }

  userRequest(){
    interface githubUserResponse{
      login:string;
      followers:number;
      public_repos:number;
      avatar_url:string;
      following:number;
      url:string;
    }
    let promise = new Promise((resolve, reject)=>{
      this.http.get<githubUserResponse>(this.userUrl + 'Waithera-m' + '?access_token=' + environment.api_key).toPromise().then(response=>{
        this.user.login = response.login
        this.user.followers = response.followers
        this.user.public_repos = response.public_repos
        this.user.avatar_url = response.avatar_url
        this.user.following = response.following
        this.user.url = response.url

        resolve()
      },
      error => {
        this.user.login = "Waithera-m"
        this.user.followers = 0
        this.user.public_repos = 0
        this.user.avatar_url = "https://avatars3.githubusercontent.com/u/60571734?v=4"
        this.user.following = 0
        this.user.url = "https://api.github.com/users/Waithera-m"

        reject(error)
      })
    })
    return promise
  }

}


  