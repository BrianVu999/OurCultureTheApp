import { Component, OnInit } from '@angular/core';

import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  active = '';

  NAV = [
    {
      name: 'Home',
      link: '/home',
      icon: 'calendar'
    },
    {
      name: 'Popular-events',
      link: '/popular-events',
      icon: 'list'
    },
    {
      name: 'Contribution',
      link: '/contribution',
      icon: 'person-circle'
    }
  ]

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url
    })
  }

  ngOnInit() { }

}