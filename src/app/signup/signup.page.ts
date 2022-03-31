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
  nickName=""
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
      nickName: ['', [Validators.required, Validators.pattern('[A-Za-z0-9_]+$')]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%$!]+$')]],
      conpassword: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%$!]+$')]]
    });
  }
  
  get errorControl() {
    return this.signupForm.controls;
  }

  submitForm() {
    //check the input
    this.isSubmitted = true;
    if (!this.signupForm.valid) {
      this.alert("Please provide reqiured information")
      return false;
    } else {
      console.log(this.signupForm.value)
    }

    if(this.signupForm.get('email').value=="test@test.com"){
      this.alert("This email has existed in the system, please go to login page.")
    }
    else if(this.signupForm.get('conpassword').value==this.signupForm.get('password').value){
      this.alertActionForSetUp()
      this.router.navigate(['login']).then(nav=>{
        //this.router.navigate([currentUrl]);
        console.log(nav);
        location.reload();
      },err=>{ console.log(err);
      });
      
    }else{
      this.alert("oops! Please make sure your input passwords match!") 
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

  //show alert
  async alertActionForSetUp() {
    const alert = await this.alertControl.create({
      header:'Welcome, Doris',
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

}
