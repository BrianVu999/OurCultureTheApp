import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup
  name=""
  email =""
  password = ""
  conpassword = ""
  isSubmitted = false
  alertMessage = ""

  validation_messages = {
    'password': [

      { type: 'validPassword', message: 'Password Not Match.' }
    ]}

  constructor(
    private authenticationService: AuthenticationService,
    public formBuilder:FormBuilder,
    public alertControl:AlertController,private router: Router) {
      this.authenticationService.errorMsg.subscribe((msg) => {
        this.alertMessage = msg;
      });
    }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z0-9_]+$')]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%$!]+$')]],
      conpassword: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%$!]+$')]]
    });
  }
  
  get errorControl() {
    return this.signupForm.controls;
  }

  async submitForm() {
    //check the input
    this.isSubmitted = true;

    if(
      this.signupForm.get('name').value === "" ||
      this.signupForm.get('email').value === "" ||
      this.signupForm.get('password').value === "" ||
      this.signupForm.get('conpassword').value === ""
    ){
      this.alertMessage = "Please enter all required fields!";
    }
    else if (!this.signupForm.valid) {
      this.alertMessage = "Please enter valid input!";
    }
    else if (this.signupForm.get('password').value != this.signupForm.get('conpassword').value) {
      this.alertMessage = "Your passwords are not matched!";
    }
    else if(
      await this.authenticationService.SignUp(
        this.signupForm.get('name').value,
        this.signupForm.get('email').value,
        this.signupForm.get('password').value
      )
    ){
      this.router.navigate(['contribution']);
      this.displaySignupSuccess("", "You have signed up successfully");
    }
  }

  async displaySignupSuccess(header:string ,msg:string) {
    const alert = await this.alertControl.create({
      header:header,
      subHeader:'',
      message:msg,
      buttons:[
       {text:'Ok',
        handler:()=>{
          this.router.navigate(['login']).then(nav=>{
            //this.router.navigate([currentUrl]);
            console.log(nav)
            location.reload();
          },err=>{ console.log(err)
          });
        }
      }
      ]
    });
    await alert.present();
  }

}
