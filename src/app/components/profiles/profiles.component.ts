import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  user:User;
  username: string;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {this.user = user; console.log(this.user)})
  }

}
