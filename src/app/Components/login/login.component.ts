import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {LoginInterface} from './interfaces/formInterface';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {}


  ngOnInit(): void {
  }
  loginForm=new FormGroup({
    email: new FormControl('',
    [Validators.required,Validators.email]
    ),
    password: new FormControl('',
    [Validators.required])
  })
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
   
  onSubmit(){
    console.warn(this.loginForm.value);
    const value=this.loginForm.value;
    const usersString=localStorage.getItem('users');
    if(usersString!==null){
      const users= JSON.parse(usersString);
    console.log(users);
    if(users!==null){
      console.log(users);
      const found=users.find((o:LoginInterface )=> o.email.toLowerCase() === value.email.toLowerCase() && o.password.toLowerCase()===value.password.toLowerCase());
      if(found){
        console.log('found');
        AuthService.login();
        this.router.navigate(['/dashboard']);
      }
      else{
        console.log(found,'not found');
      }
     }
  }
  
  }

}
