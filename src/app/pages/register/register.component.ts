import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      telefono: ['', Validators.required],
      dataNascita: ['', Validators.required]
    });
  }

  //non bisogna fare il passaggio dei parametri con const
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          alert('Registrazione avvenuta con successo!');
          this.registerForm.reset(); 
        },
        error: (error: any) => {
          alert('Errore durante la registrazione. Riprova.');
        },
        complete: () => {
          console.log('Processo di registrazione completato.');
        }
      });
    } else {
      console.log('Il form non è valido');
    }
  }
  
  
  
}
