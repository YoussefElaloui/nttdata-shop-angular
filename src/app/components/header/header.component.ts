import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { TokinStorageService } from 'src/app/services/tokin-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:User|null=null;
  isLogin:boolean=false;


  constructor(
    private tokenService: TokinStorageService
  ) {
    this.user=this.tokenService.getUser();
    if(this.user) this.isLogin =true;
  }

  ngOnInit(): void {
  }

}
