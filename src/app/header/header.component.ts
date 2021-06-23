import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { stringify } from 'json5';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  chTheme = "black" ;
  notTheme = "white";
  mode = "";

  constructor(public LoginService : UserService,public Alert : AlertController) { }

  onLogin(){
    this.LoginService.current_mail = (<HTMLInputElement>document.getElementById("username")).value;
    this.LoginService.current_pass= (<HTMLInputElement>document.getElementById("password")).value;
  }

  lighttheme(event){
    console.log(event.detail.checked);
    if (event.detail.checked) {
      document.body.setAttribute('color-theme','dark');
      this.chTheme = 'white';
      this.notTheme = 'black';
      this.mode = "Dark Mode";
    }
    else{
      document.body.setAttribute('color-theme','light');
      this.chTheme = 'black';
      this.notTheme = 'white';
      this.mode = "Light Mode";
    }
  }

  logout(){
    this.LoginService.current_mail = "";
    this.LoginService.current_pass = "";
  }

  async presentAlert() {
    const alert = await this.Alert.create({
      
      cssClass: 'my-custom-class',
      header: 'Login',
      inputs: [
        {
          name: 'username',
          type: 'text',
          cssClass : 'input_css',
          id: 'username',
          value : '',
          placeholder: 'username or email-id'
        },
        {
          name: 'password',
          type: 'text',
          id: 'password',
          value : '',
          placeholder: 'password'
        },
          
      ],
      buttons: [
         {
          text: 'Login',
          handler: () => {
            this.onLogin();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {}

}


