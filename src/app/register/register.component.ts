import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  public user = new User();

  confirmPassword?:string;
  myForm! : FormGroup;
  err!:any;
  loading : boolean = false;

  constructor(private formBuilder : FormBuilder){}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({

      username : ['' , [Validators.required]],
      email : ['' , [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['' , [Validators.required]]
    });
  
  }

  onRegister(){
    console.log(this.user);
  }




}
