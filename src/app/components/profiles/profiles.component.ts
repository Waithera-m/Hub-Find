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
  repos:Repo[];
  repo:Repo;
  username:string;
 

  constructor(private userService:UserService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    
    this.userService.userRequest()
    this.user = this.userService.user;

    this.userService.repoRequest()
    this.repo = this.userService.repo
   
    
    
  }
  returnProfile(){
    this.spinner.show();
    this.userService.changeUser(this.username);
    this.userService.userRequest()
    this.user = this.userService.user;

    this.userService.repoRequest()
    this.repos = this.userService.repos;
    console.log(this.repos)
    this.spinner.hide();
  }
    

}
