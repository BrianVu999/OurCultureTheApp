import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  email = ""
  password = ""
  isSubmitted = false

  constructor(public formBuilder:FormBuilder,public alertControl:AlertController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%$!]+$')]]
    })
  }
  get errorControl() {
    return this.loginForm.controls;
  }

  submitForm() {
    //check the input
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      this.alert("Please provide required email address and password")
      return false;
    } else {
      console.log(this.loginForm.value)
    }

    if(this.loginForm.get('email').value=="test@test.com"&&this.loginForm.get('password').value=="123456789"){
      this.alertActionLoginSuccessful()
    }
    else if(this.loginForm.get('email').value=="new@test.com"){
      this.alert("oops! we could not find matching username.Please sign up.") 
    }
    else{
      this.alert("oops! password doesn't not match username. If you have already signed up please click Find my password link.") 
    }

  }

async alert(msg:string) {
  const alert = await this.alertControl.create({
    header:'Alert',
    subHeader:'',
    message:msg,
    buttons:[
     {text:'Ok',
      handler:()=>{console.log(msg);}
    }
    ]
  });
  await alert.present();
}

  async alertActionLoginSuccessful() {
    const alert = await this.alertControl.create({
      header:'',
      subHeader:'',
      message:'Welcome Back',
      buttons:[
       {text:'Ok',
        handler:()=>{console.log('Welcome Back');}
      }
      ]
    });
    await alert.present();
  }

}
