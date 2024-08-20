// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/Auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params['user']);
      if (params['user']) {
        this.user = JSON.parse(params['user']);
        this.authService.setUser(this.user);
      } else {
        this.user = this.authService.getUser();
      }
    });
  }

  logout(): void {
    console.log("Logout method invoked");
    this.authService.logout();
  }
}
