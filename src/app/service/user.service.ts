import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  current_mail = "defw";
  current_pass = "223";

  bgColor = "white";
  textColor = "black";

  constructor() { }
}
