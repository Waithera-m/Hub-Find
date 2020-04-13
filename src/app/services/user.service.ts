import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Repo } from '../models/repo';
import { HttpClient } from '@angular/common/http';
import {environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private username='Waithera-m';

  userUrl: string = 'https://api.github.com/users/'
  
  user: User;
  repo: Repo;
  repos: Repo[];
  

  constructor(private http:HttpClient) {
   
    this.user = new User("", 0, 0, "", 0, "", new Date);
    this.repo = new Repo("", "", "");
    this.repos = [];
  }

  userRequest(){
    interface githubUserResponse{
      login:string;
      followers:number;
      public_repos:number;
      avatar_url:string;
      following:number;
      url:string;
      created_at:Date;
    }
    let promise = new Promise((resolve, reject)=>{
      this.http.get<githubUserResponse>(this.userUrl + this.username + '?access_token=' + environment.api_key).toPromise().then(response=>{
        this.user.login = response.login
        this.user.followers = response.followers
        this.user.public_repos = response.public_repos
        this.user.avatar_url = response.avatar_url
        this.user.following = response.following
        this.user.url = response.url
        this.user.created_at = response.created_at

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

  repoRequest(){

    interface repoResponse{
      full_name:string;
      url:string;
      description:string;
    }
    if(this.username = this.username){}
    let promise = new Promise((resolve, reject)=>{
      this.http.get<repoResponse>(this.userUrl + this.username +'/repos?access_token=' + environment.api_key).toPromise().then(response => {
        this.repo = response
        this.repo.full_name = response.full_name
        this.repo.url = response.url
        this.repo.description = response.description
        
        // console.log(response)
        // console.log(this.repos)
        

        resolve()
      },
      
      error => {
        this.repo.full_name = "WePizzaYou"
        this.repo.description = "The web application allows users to place their pizza orders and view the total charge"
        this.repo.url = "https://api.github.com/repos/Waithera-m/WePizzaYou"

        reject(error)
      })
    })
    return promise
  }

  changeUser(username: string){
    this.username = username;
  }

}


  