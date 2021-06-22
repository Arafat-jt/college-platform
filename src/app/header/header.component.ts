import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  chTheme = "" ;

  constructor() { }

  lighttheme(event){
    console.log(event.detail.checked);
    if (event.detail.checked) {
      document.body.setAttribute('color-theme','dark');
      this.chTheme = 'white';
    }
    else{
      document.body.setAttribute('color-theme','light');
      this.chTheme = 'black';
    }
  }

  ngOnInit() {}

}
