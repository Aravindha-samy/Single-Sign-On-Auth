// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any;

  constructor(private http: HttpClient, private router: Router) {}

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:3000/auth/google';
  }

  setUser(user: any): void {
    this.user = user;
  }

  getUser(): any {
    return this.user;
  }

  logout(): void {
    this.http.get('http://localhost:3000/auth/logout').subscribe(
      (res:any) => {  

      console.log(this.user);
      this.user = null;
      console.log(this.user);
      this.router.navigate([res.url])
    },
    (err)=>{
      console.log(this.user);
      this.user = null;
      console.log(this.user);
      this.router.navigate(['/'])
        console.log(err,"Error");
    }
  );
  }
}
