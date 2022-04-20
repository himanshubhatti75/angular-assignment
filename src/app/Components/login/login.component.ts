import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {LoginInterface} from './interfaces/formInterface';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { PopupComponent } from '../common/popup/popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private dialogRef: MatDialog,
    private authService: AuthService) {}
   
  openDialog(){
    this.dialogRef.open(PopupComponent,{
      data: {
        title: "Login Error",
        message: "Account not found try again"
      }
    });
    
  }

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
    const value=this.loginForm.value;
    const usersString=localStorage.getItem('users');
    if(usersString!==null){
      let users= JSON.parse(usersString);
    if(users!==null){
      const found=users.find((o:LoginInterface )=> o.email.toLowerCase() === value.email.toLowerCase() && o.password.toLowerCase()===value.password.toLowerCase());
      if(found){
        this.authService.login(found);
        this.router.navigate(['/dashboard']);
      }
      else{
        this.openDialog();
      }
     }
  }
  }
}
