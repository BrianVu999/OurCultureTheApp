import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  searchValue:string = ""

  searchableItems:any = {
    'Oct 8 Milad un Nabi (Mawlid), Muslim':'event-detail',
    'Oct 10 First day of Sukkot, Jewish Holiday':'event-detail',
    'Oct 10 Thanksgiving Day, Statutory Holiday':'event-detail',
    'Oct 11 Thanksgiving Day, Statutory Holiday':'event-detail',
    'Oct 12 Thanksgiving Day, Statutory Holiday':'event-detail',
    'Oct 13 Thanksgiving Day, Statutory Holiday':'event-detail',
    'Oct 14 Thanksgiving Day, Statutory Holiday':'event-detail',
    'Oct 15 Thanksgiving Day, Statutory Holiday':'event-detail',
  }

  displaySearchableItems:any = {}
  
  constructor() {

  }
  searchListener = () => {
    //Refresh/Clear drop-down list
    this.displaySearchableItems = {}

    //When search input is blank
    if(!this.searchValue || !this.searchValue.trim()){
      return;
    }

    //Find and display items drop-down list
    for (const key in this.searchableItems) {
      //.replace(/ /g, "") to remove space
      if(key.replace(/ /g, "").toUpperCase().includes(this.searchValue.trim().replace(/ /g, "").toUpperCase())){
        this.displaySearchableItems[key]=this.searchableItems[key]
      }
    }
    
    if(Object.keys(this.displaySearchableItems).length===0){
      this.displaySearchableItems = {'Cannot find a matching event':''}
    }

  }
  clearlBtnClick= ()=> {
    this.searchValue="";
    this.displaySearchableItems = {};
  }

  ngOnInit() {}

}
