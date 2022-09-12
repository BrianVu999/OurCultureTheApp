import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  email = '';
  password = '';
  isSubmitted = false;
  alertMessage = '';

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public alertControl: AlertController
  ) {}

  ngOnInit() {
    //Username and password validation condition
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.pattern('[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),],],
      password: ['',[Validators.required, Validators.pattern('^[A-Za-z0-9._%$!]+$')],],
    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  submitForm() {
    this.alertMessage = '';

    //Validate username and password
    this.isSubmitted = true;
    if (this.loginForm.get('email').value === '' || this.loginForm.get('password').value === '') {
      this.alertMessage = 'Please enter all required field!';
    } 
    else if (!this.loginForm.valid) {
      this.alertMessage = 'Please enter valid username and password!';
    } 
    else if (this.loginForm.get('email').value !== 'test@test.com') {
      this.alertMessage = 'Your username is not found!';
    }
    else if (
      this.loginForm.get('email').value == 'test@test.com' &&
      this.loginForm.get('password').value == '123456789'
    ) 
    {
      this.router.navigate(['contribution']);
      this.alert('', 'Welcome Back!');
    } 
    else 
    {
      this.alertMessage = "Your password doesn't match with the username!";
    }
  }

  async alert(header: string, msg: string) {
    const alert = await this.alertControl.create({
      header: header,
      subHeader: '',
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log(msg);
          },
        },
      ],
    });
    await alert.present();
  }
}
