import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-popular-events',
  templateUrl: './popular-events.page.html',
  styleUrls: ['./popular-events.page.scss'],
})
export class PopularEventsPage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public alertControl: AlertController,
    private router: Router,
    private db: DatabaseService
  ) {}

  item:any;

  eventsArray= ['Christmas Eve, Christian','First day of Sukkot, Jewish Holiday','Ramadan, Muslim','Thanksgiving Day, Statutory Holiday',
  'Milad un Nabi (Mawlid), Indian','Easter Monday, Christian','Good Friday, Christian','Eid al-Fitr, Muslim','St. Valentines Day, Christian']

  ngOnInit() {
  }
  upDate(sel:any){
    console.log(sel.target.value)
  }

}
