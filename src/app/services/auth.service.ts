import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private loggedIn = new BehaviorSubject<boolean>(false);
    get isLoggedIn() {
        return this.loggedIn.asObservable(); 
      } 
    constructor(){
        if(this.getUser()){
            this.loggedIn.next(true);
        }
    }  
    login(user:any){
        localStorage.setItem('user-auth',JSON.stringify(user));
        this.loggedIn.next(true);
    }
    logout(){
        localStorage.removeItem('user-auth');
        this.loggedIn.next(false);
    }
    getUser(){
        const retrievedUser=localStorage.getItem('user-auth');
        if(retrievedUser){
            const user=JSON.parse(retrievedUser);
            return user
        }
        return null;
    }
  }