import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  current_mail = "";
  current_pass = "";

  bgColor = "white";
  textColor = "black";

  constructor() { }
}
