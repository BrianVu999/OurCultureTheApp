import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from "@angular/forms";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.page.html',
  styleUrls: ['./contribution.page.scss'],
})
export class ContributionPage implements OnInit {
   isSubmitted = false;
  loginForm: FormGroup 

  constructor(public formBuilder:FormBuilder,public alertControl:AlertController) { }

  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      religious: ['', [Validators.required]],
      same: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    }) 
  }

  submitForm() {
    //check the input
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      this.alert("Please provide all the required values")
      return false;
    } else {
      console.log(this.loginForm.value)
    }}

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


}
