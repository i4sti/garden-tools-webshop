import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    }),
  });
  constructor(private authService: AuthService, private userSevice : UserService){}

  onSubmit(){
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    const firstname = this.signUpForm.get('name.firstName')?.value;
    const lastname = this.signUpForm.get('name.lastName')?.value;
    if (email && password && firstname && lastname) {
      this.authService.signup(email, password).then(cred => {
        console.log(cred);
        const user : User = {
          id: cred.user?.uid as string,
          email: email,
          username: email.split('@')[0],
          name: {
            firstName: firstname,
            lastname: lastname
          }
        };
        this.userSevice.create(user).then(_ =>{
          console.log('User added succesfully.')
        }). catch(error => {
          console.error(error); 
        });
      }).catch(error => {
        console.error(error);
      });
    }else{
      console.log("You need to fill in all the inputs")
    }
  
  }
}
