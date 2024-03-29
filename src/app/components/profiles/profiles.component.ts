import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Repo } from '../../models/repo';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  user:User;
  repos:Repo [];
  repo:Repo;
  username:string;
 

  constructor(public userService:UserService, private spinner:NgxSpinnerService) {
    //get user
    this.spinner.show();
    this.userService.userRequest()
    this.user = this.userService.user;

    //get repositories
    this.userService.repoRequest();
    console.log("here: ", this.userService.repoRequest());
    this.repo = this.userService.repo;

    this.spinner.hide();
    
    // console.log(this.repo);
   }

  returnProfile(){
    
    this.userService.changeUser(this.username);
    this.userService.userRequest()
    this.user = this.userService.user

    this.userService.repoRequest();
    console.log(this.userService.repoRequest())
    this.repo = this.userService.repo;
  }
  userRequest(){
   
  }
  repoRequest(){
    
  }

  ngOnInit() {
    

    
  }
 

}
