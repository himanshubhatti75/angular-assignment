export class AuthService{
    static user: String |null='user';
   
    static login(){
        this.user='user';
    }
    static logout(){
        this.user=null;
    }

  }