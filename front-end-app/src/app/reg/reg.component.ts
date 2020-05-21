import { Component, OnInit } from '@angular/core';
import { CheckFormService } from "../check-form.service";
import { AuthService } from '../auth.service';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  name: String;
  login: String;
  email: String;
  password: String;

  constructor(
    private checkForm: CheckFormService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  userRegisterClick() {
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password
    };

    if (!this.checkForm.checkName(user.name)) {
      this.flashMessages.show("Имя пользователя не введено", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if (!this.checkForm.checkLogin(user.login)) {
      this.flashMessages.show("Логин пользователя не введен", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if (!this.checkForm.checkEmail(user.email)) {
      this.flashMessages.show("Email пользователя не введен", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    } else if (!this.checkForm.checkPassword(user.password)) {
      this.flashMessages.show("Пароль пользователя не введен", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        this.router.navigate(['/reg']);
      } else {
        this.flashMessages.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        });
        this.router.navigate(['/auth']);
      }
    });

  }

}
