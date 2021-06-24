import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  sent_msg: string;
  all_msgs: any[] = [];

  currentDate: Date;
  postdata: {};

  bgColor = "" ;
  textColor = "";

  constructor(public LoginService : UserService, private http : HttpClient, public toastc : ToastController)
   { this.retrive_msg();}

  async presentToast(msg){
    const toast =  await this.toastc.create({
      message: msg,
      duration: 2000,
      position: "top",
      color: 'light',
      cssClass: 'customclass'
    });
    toast.present();
  }

  send_msg(){
    if (this.LoginService.current_mail != "" && this.LoginService.current_pass != "") {
      if(this.sent_msg){
        this.currentDate = new Date();
        this.postdata={
          'add':'true',
          'usermsg':{
            'email': this.LoginService.current_mail,
            'pass': this.LoginService.current_pass,
            'msg': this.sent_msg,
            'from': 'user',
            'date-time': this.currentDate
          }
        }
        this.http.post("http://127.0.0.1:8000/api/user/addmsg/", this.postdata).subscribe(data =>{
          console.log(data);     
          if (data['status'] == "Successfully saved"){
            this.presentToast("Sent");
          } 
          else{
            this.presentToast("Failed to sent");
            this.retrive_msg();
          }  
        });
      }
      else
        console.log("no msg typed");
    }
    else{
      this.presentToast("Login First!!!");
    }
  }
  retrive_msg(){
    if (this.LoginService.current_mail != "" && this.LoginService.current_pass != "") {
      this.all_msgs = [];
      this.postdata={
        'get':'true',
        'user':{
          'email': this.LoginService.current_mail,
          'pass': this.LoginService.current_pass
        }
      }
      this.http.post("http://127.0.0.1:8000/api/user/getchat/", this.postdata).subscribe((data:any) =>{
          console.log(data);     
          if (data['status'] == "Successfully retrieved"){
            for(let i of data.chat.chat){
              this.all_msgs.push({
                'msg': i.msg,
                'from': i.from,
                'date_time': i.date_time
              });
            }
          } 
          else{
            this.presentToast("Could not load Chat");
          }  
        });
    }
    else{
      this.presentToast("Login First!!!");
    }
  }

  ngOnInit() {}

}
