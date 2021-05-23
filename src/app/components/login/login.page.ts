import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup

  constructor( private formBuilder: FormBuilder,
               private router: Router ) { }

  ngOnInit(  ) {
    this.generateForm();
  }


  generateForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    console.log( this.loginForm.value )
  }

}
