import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.authService.logout();
    this.flashMessages.show("Вы вышли из учетной записи", {
      cssClass: 'alert-warning',
      timeout: 4000
    });
    this.router.navigate(['reg']);
    return false;
  }

}
