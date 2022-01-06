import { Component, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { stringify } from 'json5';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  bgColor = "white" ;
  textColor = "black";
  @Output() mode = "";
  currentCum = "";

  constructor(public LoginService : UserService,public Alert : AlertController) { }

  onLogin(){
    this.LoginService.current_mail = (<HTMLInputElement>document.getElementById("username")).value;
    this.LoginService.current_pass= (<HTMLInputElement>document.getElementById("password")).value;
  }

  lighttheme(event){
    console.log(event.detail.checked);
    if (event.detail.checked) {
      document.body.setAttribute('color-theme','dark');
      this.LoginService.bgColor = this.bgColor = 'black';
      this.LoginService.textColor = this.textColor = 'white';
      this.mode = "Dark Mode";
    }
    else{
      document.body.setAttribute('color-theme','light');
      this.LoginService.bgColor = this.bgColor = 'white';
      this.LoginService.textColor = this.textColor = 'black';
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

  changeCum(currentCum){
    this.currentCum = currentCum;
    if(currentCum == 'Coterie'){
      this.currentCum = "";
    }
  }

  ngOnInit() {}

}


