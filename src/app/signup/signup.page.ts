import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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

  constructor(public formBuilder:FormBuilder,public alertControl:AlertController) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-z0-9._%$]+$')]],
      conpassword: ['', [Validators.required, Validators.pattern('^[a-z0-9._%$]+$')]]
    },
    {
      validator: this.checkMatchValidator('password', 'conpassword')
    })
  }

  checkMatchValidator(field1: string, field2: string) {
    return function (frm) {
      let field1Value = frm.get(field1).value;
      let field2Value = frm.get(field2).value;
  
      if (field1Value !== '' && field1Value !== field2Value) {
        return { 'notMatch': `value ${field1Value} is not equal to ${field2}` }
      }
      return null;
    }
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

}
