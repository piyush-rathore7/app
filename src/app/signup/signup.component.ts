import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: any;
  errorMessage: any;
  confirmPassword: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.confirmPassword = '';
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl(''),
      'password': new FormControl('', [Validators.required]),
      'id': new FormControl('', [Validators.required]),
      'gender': new FormControl('male', [Validators.required]),
    });
  }

  signupsubmit(signupForm: any) {
    this.errorMessage = null;
    this.userService.addUser(signupForm.value).subscribe((response: any) => {
      if (response.errorMessage !== null) {
        this.errorMessage = response.errorMessage;
      }
      else {
        this.router.navigate(['/login'])
      }
      console.log(response)
    }, (error) => {
      console.log(error);
    })
  }

  get passwordCheck() {
    return !(this.signupForm.get('password').value === this.confirmPassword);
  }

  navigate(screen) {
    if (screen === 'google') {
      location.replace('https://www.gmail.com');
    } else if (screen === 'fb') {
      location.replace('https://www.facebook.com');
    }
  }
}
