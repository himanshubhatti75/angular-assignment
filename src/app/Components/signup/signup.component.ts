import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { PasswordValidator } from './custom-validators/password.validator';
import {SignupFormInterface} from '../../FormInterface';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  constructor(private router: Router){}
  previewUrl='';
  colleges=[{
    value: "uiit",
    viewValue: "uiit Shimla"
  },{
    value: "iit",
    viewValue: "iit Mandi"
  },{
    value: "nit",
    viewValue: "nit Hamirpur"
  }]
  
  ngOnInit(): void {
   
  }
  signupForm=new FormGroup({
    firstName: new FormControl("",[Validators.required]),
    lastName: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,PasswordValidator.strong()]),
    confirmPassword: new FormControl("",[Validators.required]),
    website: new FormControl("",[Validators.required]),
    aboutUs: new FormControl("",[Validators.required]),
    gender: new FormControl("m",[Validators.required]),
    smartWork: new FormControl(false),
    fastLearning: new FormControl(false),
    college: new FormControl("",[Validators.required]),
    date: new FormControl("",[Validators.required]),
    img: new FormControl(null,[Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  },
{validators: PasswordValidator.match('password', 'confirmPassword')}
  )
  
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
  get website() { return this.signupForm.get('website'); }
  get aboutUs() { return this.signupForm.get('aboutUs'); }
  get gender() { return this.signupForm.get('gender'); }
  get smartWork() { return this.signupForm.get('smartWork'); }
  get fastLearning() { return this.signupForm.get('fastLearning'); }
  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get college() { return this.signupForm.get('college'); }
  get date() { return this.signupForm.get('date'); }
  get img() { return this.signupForm.get('img'); }
   
  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signupForm.patchValue({
        fileSource: file
      });
      const formData = new FormData();
    formData.append('img', this.signupForm.get('fileSource')?.value);
    }
  } 
  readURL(file :any){
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e?.target?.result);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(file);
    });
};
  async preview (event:any) {
    const file = event.target.files[0];
    const url = await this.readURL(file);
   
    if(typeof url=== "string"){
      this.previewUrl = url;
    }
};
  onSubmit(){
    const value=this.signupForm.value;
    var fr = new FileReader();
    console.log(fr.readAsDataURL(value.fileSource));
    console.log(value.fileSource);
    console.log(value);
    delete value.confirmPassword

    const usersString=localStorage.getItem('users');
    if(usersString!==null){
      const users= JSON.parse(usersString);
    console.log(users);
    if(users!==null){
      let obj = users.find((o:SignupFormInterface )=> o.email.toLowerCase() === value.email.toLowerCase());
      if(obj){
        console.log('account already exist');
        return;
      }
      else{
        users.push(value);
        localStorage.setItem('users',JSON.stringify(users));
        AuthService.login();
        this.router.navigate(['/dashboard']);
      }
     }
     else{
      localStorage.setItem('users',JSON.stringify([value]));
      AuthService.login();
      this.router.navigate(['/dashboard']);
     }
    const lItem=localStorage.getItem('users');
    if(lItem!==null){console.log(JSON.parse(lItem));}
    // localStorage.setItem('form',JSON.stringify(value));
    // const lItem=localStorage.getItem('form');
    // console.log(JSON.parse(lItem));
    }
  }
 
  
}
