import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Repo } from '../models/repo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private username='Waithera-m';

  userUrl: string = 'https://api.github.com/users/'
  
  user:User;
  repo:Repo;
  repos:Repo[]=[];
  

  constructor(private http:HttpClient) {
   
    this.user = new User("", 0, 0, "", 0, "", new Date, "");
    this.repo = new Repo("", "", "");
    this.repos = [];
  }

  generateHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    //.set("Access-Control-Allow_origin", "*")
    .set("Authorization", `token=${environment.api_key}`);
    return headers;
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
      html_url:string;
    }
    let promise = new Promise((resolve, reject)=>{
      this.http.get<githubUserResponse>(this.userUrl + this.username, {headers: this.generateHeaders()}).toPromise().then(response=>{
        this.user.login = response.login
        this.user.followers = response.followers
        this.user.public_repos = response.public_repos
        this.user.avatar_url = response.avatar_url
        this.user.following = response.following
        this.user.url = response.url
        this.user.created_at = response.created_at
        this.user.html_url = response.html_url

        //resolve()
      },
      error => {
        this.user.login = "error"
        this.user.followers = 0
        this.user.public_repos = 0
        this.user.avatar_url = "https://avatars3.githubusercontent.com/u/60571734?v=4"
        this.user.following = 0
        this.user.url = "error"

        reject(error)
      })
    })
    
    return promise
  };

  repoRequest(){

    interface repoResponse{
      full_name:string;
      url:string;
      description:string;
    }
    
    let promise = new Promise((resolve, reject)=>{
      this.http.get<repoResponse>(this.userUrl + this.username +'/repos' , {headers: this.generateHeaders()}).toPromise().then(response => {
        this.repo = response;
        //resolve()
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


  