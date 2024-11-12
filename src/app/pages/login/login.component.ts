import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthJwtService } from '../../core/services/auth-jwt.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {

  email: string = ""; 
  password: string = ""; 
  autenticato: boolean = true;
  errorMsg: string = "Spiacente, la mail e/o la password sono errati!";
  okMsg: string = "Accesso consentito!";

  constructor(private route: Router, private authService: AuthJwtService) {}

  ngOnInit(): void {}

  gestAuth() {
    this.authService.autenticateService(this.email, this.password).subscribe({
      next: (response) => {  
        console.log('Server response:', response);  // Log per controlli generali
        console.log(response.token);
        console.log(response.decoded);
  
        const token = response.token;  
        const decodedToken = response.decoded;  
  
        if (token) {
          // Salva il token e i dati decodificati
          sessionStorage.setItem("AuthToken", `Bearer ${token}`);
          sessionStorage.setItem("Utente", JSON.stringify(decodedToken));
  
          this.route.navigate(['welcome']);
          this.autenticato = true;
        } else {
          this.errorMsg = 'Login fallito, credenziali errate';
          this.autenticato = false;
        }
      },
      error: (error) => {  
        console.error('Errore durante il login:', error);
        this.errorMsg = 'Errore durante il login. Riprova.';
        this.autenticato = false;
      },
      complete: () => {  
        console.log('Autenticazione completata');
      }
    });
  }
  
}
