import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  searchValue:string = ""
  allEvents:any
  
  displayResults:any
  
  constructor(private dbService: DatabaseService){
    this.allEvents = dbService.allEvents
    dbService.allEvents.subscribe(allEvents => {
      this.allEvents = allEvents
    })
  }
  
  searchListener = () => {
    //Refresh/Clear drop-down list
    this.displayResults = []

    //When search input is blank
    if(!this.searchValue || !this.searchValue.trim()){
      return;
    }

    //Find and display items drop-down list, 
    //it will make database call in the future instead of search in an array for now
    
    // for (const key in this.searchableItems) {
    //   //.replace(/ /g, "") to remove space
    //   if(key.replace(/ /g, "").toUpperCase().includes(this.searchValue.trim().replace(/ /g, "").toUpperCase())){
    //     this.displayResults[key]=this.searchableItems[key]
    //   }
    // }

    for(let i = 0; i < this.allEvents.length; i++){
      if((this.allEvents[i].name+this.allEvents[i].date).replace(/ /g, "").toUpperCase().includes(this.searchValue.trim().replace(/ /g, "").toUpperCase())){
        this.displayResults.push(this.allEvents[i])
        //Limit result only 20 events
        if(this.displayResults.length == 20){
          return;
        }
      }
    }
    if(this.displayResults.length==0){
      this.displayResults = [{name: 'Cannot find a matching event'}]
    }

  }
  clearlBtnClick= ()=> {
    this.searchValue="";
    this.displayResults = []
  }

  eventClick(selectedEvent){
    this.dbService.updateSelectedEvent(selectedEvent);
    this.searchValue = ""
    this.displayResults = []
  }

  ngOnInit() {}

}
