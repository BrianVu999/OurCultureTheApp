import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.page.html',
  styleUrls: ['./contribution.page.scss'],
})
export class ContributionPage implements OnInit {
  isSubmitted = false;
  contributeForm: FormGroup;
  alertMessage = '';

  constructor(
    public formBuilder: FormBuilder,
    public alertControl: AlertController,
    private router: Router,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.contributeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      religious: ['', [Validators.required]],
      same: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      ritual: ['', [Validators.required]],
      canadaObservedPlace: ['', []],
      dateDetermination: ['', []],
    });
  }

  submitForm() {
    //check the input
    this.isSubmitted = true;
    if (
      this.contributeForm.get('name').value === '' ||
      this.contributeForm.get('date').value === '' ||
      this.contributeForm.get('type').value === '' ||
      this.contributeForm.get('religious').value === '' ||
      this.contributeForm.get('same').value === '' ||
      this.contributeForm.get('reason').value === '' ||
      this.contributeForm.get('ritual').value === ''
    ) {
      this.alertMessage = 'Please enter all required fields!';
    } else if (!this.contributeForm.valid) {
      this.alertMessage = 'Please enter valid input!';
    } else {
      this.contributeSucces('', 'Your contribution is received');
      this.db.saveEvent({
        name: this.contributeForm.get('name').value,
        date: this.contributeForm.get('date').value,
        dateDetermination: this.contributeForm.get('dateDetermination').value,
        religious: this.contributeForm.get('religious').value,
        eventType: this.contributeForm.get('type').value,
        canadaObservedPlace: this.contributeForm.get('canadaObservedPlace')
          .value,
        reason: this.contributeForm.get('reason').value,
        activity: this.contributeForm.get('ritual').value,
      });
    }
  }

  async contributeSucces(header: string, msg: string) {
    const alert = await this.alertControl.create({
      header: header,
      subHeader: '',
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['home']).then(
              (nav) => {
                //this.router.navigate([currentUrl]);
                console.log(nav);
                location.reload();
              },
              (err) => {
                console.log(err);
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }
}
