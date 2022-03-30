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
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-z0-9._%$!]+$')]]
    })
  }
  get errorControl() {
    return this.loginForm.controls;
  }

  submitForm() {
    //check the input
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      this.alertAction()
      return false;
    } else {
      console.log(this.loginForm.value)
    }

    if(this.loginForm.get('email').value=="test@test.com"&&this.loginForm.get('password').value=="123456789"){
      this.alertActionLoginSuccessful()
      
    }
    else if(this.loginForm.get('email').value=="new@test.com"){
      this.alertActionLoginFaild() 
    }
    else{
      this.alertActionFindYourPassword() 
    }

  }

  //show alert when missing the required data
  async alertAction() {
    const alert = await this.alertControl.create({
      header:'Alert',
      subHeader:'',
      message:'Please provide all the required values',
      buttons:[
       {text:'Ok',
        handler:()=>{console.log('Please provide all the required values!');}
      }
      ]
    });
    await alert.present();
  }

  async alertActionFindYourPassword() {
    const alert = await this.alertControl.create({
      header:'Alert',
      subHeader:'',
      message:'Password and username not Match',
      buttons:[
       {text:'Ok',
        handler:()=>{console.log('Password and username not Match');}
      }
      ]
    });
    await alert.present();
  }

  async alertActionLoginFaild() {
    const alert = await this.alertControl.create({
      header:'Alert',
      subHeader:'',
      message:'Please sign up',
      buttons:[
       {text:'Ok',
        handler:()=>{console.log('Please sign up');}
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
