import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { PrenotazioneServiceService } from '../../core/services/Data/prenotazione-service.service';  
import { CommonModule } from '@angular/common';
import { AuthJwtService } from '../../core/services/auth-jwt.service';

@Component({
  selector: 'app-prenotazioneveicolo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './prenotazioneveicolo.component.html',
  styleUrls: ['./prenotazioneveicolo.component.css']
})
export class PrenotazioneVeicoloComponent implements OnInit {
  veicoloId!: number;
  prenotazioneForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private prenotazioneService: PrenotazioneServiceService,
    private authService: AuthJwtService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // + operatore unario che converte una stringa in un numero
    this.veicoloId = +this.route.snapshot.paramMap.get('veicoloId')!;

    this.prenotazioneForm = this.fb.group({
      dataInizio: ['', Validators.required],
      dataFine: ['', Validators.required],
      note: ['']  
    });
  }

  onSalvaPrenotazione(): void {
    if (this.prenotazioneForm.valid) {
      const user = this.authService.getCurrentUser();

      if (!user) {
        console.error('Utente non autenticato');
        return;
      }

      const prenotazione = {
        userId: user.user_id,  
        veicoloId: this.veicoloId,
        dataInizio: this.prenotazioneForm.value.dataInizio,
        dataFine: this.prenotazioneForm.value.dataFine,
        note: this.prenotazioneForm.value.note,  
        dataPrenotazione: new Date()  
      };

      this.prenotazioneService.salvaPrenotazione(prenotazione).subscribe({
        next: (response) => {
          console.log('Prenotazione salvata con successo!', response);
          this.router.navigate(['/listveicoli']);  
        },
        error: (error) => {
          console.error('Errore durante il salvataggio della prenotazione', error);
        }
      });
    }
  }
}
