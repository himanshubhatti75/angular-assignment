import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;                  
  constructor(private router: Router,private authService: AuthService) {
  }
  ngOnInit(){
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
