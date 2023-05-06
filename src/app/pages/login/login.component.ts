import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = new FormControl('');
  password = new FormControl('');
  isLoggedIn = false;
  loggedInUser?: firebase.default.User | null;



  constructor(private router: Router, private authService: AuthService){}

  async login(){
    if (this.email.value && this.password.value) {
      this.authService.login(this.email.value, this.password.value).then(cred => {
        this.isLoggedIn = true;
      }).catch(error => {
        console.error(error);
      });
    }
    this.authService.isUserLoggedIn().subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser))
      this.router.navigateByUrl('/');

    }, error => {      
      localStorage.setItem('user', JSON.stringify('null'))
      console.error(error);
    })


  }

}
