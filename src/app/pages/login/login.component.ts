import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {

  userId: string = ""; 
  password: string = ""; 
  autenticato: boolean = true;
  errorMsg: string = "Spiacente, la userid e/o la password sono errati!";
  okMsg: string = "Accesso consentito!";

  constructor(private route: Router){
    
  }
  ngOnInit(): void {

  }

  gestAuth = (): void => {
    if (this.userId === "Nicola" && this.password === "1234") {
      this.route.navigate(['welcome',this.userId]);
      this.autenticato = true;
      
    } else {
      this.autenticato = false;
      
    }
  }
}
