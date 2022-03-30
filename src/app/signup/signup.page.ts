import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup
  email =""
  password = ""
  conpassword = ""
  isSubmitted = false

  validation_messages = {
    'password': [

      { type: 'validPassword', message: 'Password Not Match.' }
    ]}

  constructor(public formBuilder:FormBuilder,public alertControl:AlertController,private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-z0-9._%$!]+$')]],
      conpassword: ['', [Validators.required, Validators.pattern('^[a-z0-9._%$!]+$')]]
    });
  }
  
  get errorControl() {
    return this.signupForm.controls;
  }

  submitForm() {
    //check the input
    this.isSubmitted = true;
    if (!this.signupForm.valid) {
      this.alertAction()
      return false;
    } else {
      console.log(this.signupForm.value)
    }

    if(this.signupForm.get('conpassword').value==this.signupForm.get('password').value){
      this.alertActionForSetUp()
      this.router.navigate(['login']).then(nav=>{
        //this.router.navigate([currentUrl]);
        console.log(nav);
        location.reload();
      },err=>{ console.log(err);
      });
      
    }else{
      this.alertActionFaild() 
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

  //show alert
  async alertActionForSetUp() {
    const alert = await this.alertControl.create({
      header:'Congratulation',
      subHeader:'',
      message:'You have signed up sccrssfully',
      buttons:[
       {text:'Ok',
        handler:()=>{console.log('Sign up sccrssfully');}
      }
      ]
    });
    await alert.present();
  }
   //show alert
   async alertActionFaild() {
    const alert = await this.alertControl.create({
      header:'Faild',
      subHeader:'',
      message:'Password not match, Please try again',
      buttons:[
       {text:'Ok',
        handler:()=>{console.log('Sign up faild');}
      }
      ]
    });
    await alert.present();
  }

}
