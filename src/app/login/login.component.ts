import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm:any;
  errorMessage:any;
  constructor(private userService:UserService,private router:Router) { }
  
  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
      });
  }

  loginsubmit(loginForm:any)
  {
    this.errorMessage=null;
    this.userService.loginuser(loginForm.value).subscribe((response:any) =>{
      if(response.errorMessage!==null)
      {
        this.errorMessage=response.errorMessage;
      }
      else{
        sessionStorage.setItem('email', response.email);
        this.router.navigate(['/homepage'])
      }
    },(error) => {
      console.log(error);
       })
  }
  navigate(screen) {
    if(screen === 'google') {
      location.replace('https://www.gmail.com');
    } else if(screen === 'fb') {
      location.replace('https://www.facebook.com');
    }
  }

}
