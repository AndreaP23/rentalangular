import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrenotazioneServiceService } from '../../core/services/Data/prenotazione-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifica-prenotazione',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modificaprenotazione.component.html',
  styleUrls: ['./modificaprenotazione.component.css']
})
export class ModificaPrenotazioneComponent implements OnInit {
  prenotazioneForm!: FormGroup;
  prenotazioneId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public prenotazioneService: PrenotazioneServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prenotazioneId = +this.route.snapshot.paramMap.get('prenotazioneId')!;
    this.prenotazioneForm = this.fb.group({
      dataInizio: ['', Validators.required],
      dataFine: ['', Validators.required],
      note: ['']
    });

    this.loadPrenotazione();
  }

  loadPrenotazione(): void {
    this.prenotazioneService.getPrenotazioneById(this.prenotazioneId).subscribe(prenotazione => {
      this.prenotazioneForm.patchValue({
        dataInizio: prenotazione.dataInizio,
        dataFine: prenotazione.dataFine,
        note: prenotazione.note
      });
    });
  }

  onSalvaPrenotazione(): void {
    if (this.prenotazioneForm.valid) {
      const prenotazioneData = {
        dataInizio: this.prenotazioneForm.value.dataInizio,
        dataFine: this.prenotazioneForm.value.dataFine,
        note: this.prenotazioneForm.value.note
      };
      this.prenotazioneService.modificaPrenotazione(this.prenotazioneId, prenotazioneData).subscribe(response => {
        console.log('Prenotazione modificata con successo!', response);
        this.router.navigate(['/listprenotazioni']);
      });
    }
  }

  onAnnulla(): void {
    this.router.navigate(['/listprenotazioni']);
  }
  
}