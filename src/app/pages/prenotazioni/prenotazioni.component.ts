import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPrenotazioni } from '../../models/Prenotazioni';
import { IColumnConfig } from '../../config/column-config';
import { PrenotazioneServiceService } from '../../core/services/Data/prenotazione-service.service';
import { prenotazioneColumnsConfig } from '../../config/prenotazioneColumnsConfig';
import { AuthJwtService } from '../../core/services/auth-jwt.service';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from '../../generic-list/generic-list.component';

@Component({
  selector: 'app-prenotazioni',
  standalone: true,
  imports: [GenericListComponent, CommonModule],
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {
  prenotazioni: IPrenotazioni[] = [];
  columnsConfig: IColumnConfig<IPrenotazioni>[] = [];
  isSuperUser: boolean;
  totalElements: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private prenotazioniService: PrenotazioneServiceService,
    private authService: AuthJwtService
  ) {
    const currentUser = this.authService.getCurrentUser();
    this.isSuperUser = currentUser && currentUser.ruolo === 'ROLE_1'; 
    this.columnsConfig = prenotazioneColumnsConfig(
      this.isSuperUser,
      this.deletePrenotazione.bind(this),
      this.editPrenotazione.bind(this)
    );
  }

  ngOnInit(): void {
    this.loadPrenotazioni();  
  }

  
  loadPrenotazioni(): void {
    const currentUser = this.authService.getCurrentUser();
    let userIdFilter: number | undefined = undefined;
  
    if (!this.isSuperUser) {
      userIdFilter = currentUser.user_id;
    }
  
    this.prenotazioniService.getPrenotazioni(this.currentPage, this.pageSize, userIdFilter).subscribe({
      next: (response) => {
        this.prenotazioni = response.content; 
        this.totalElements = response.totalElements;
        this.pageSize = response.size;  // Assicurati di avere anche la dimensione della pagina se proviene dall'API
        this.totalPages = Math.ceil(this.totalElements / this.pageSize);  // Calcolo corretto delle pagine
        
        // Log per il debug
        console.log('Total Elements:', this.totalElements);
        console.log('Page Size:', this.pageSize);
        console.log('Total Pages:', this.totalPages);
      },
      error: (error) => {
        console.error("Errore nel caricamento delle prenotazioni", error);
      },
    });
  }
  
  
  

  onPageChange(newPage: number): void {
    console.log(`Page changed to: ${newPage}`); 
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.loadPrenotazioni();  
    }
  }
  

  // Elimina una prenotazione
  deletePrenotazione(prenotazioneId: number): void {
    if (confirm('Sei sicuro di voler eliminare questa prenotazione?')) {
      this.prenotazioniService.deletePrenotazione(prenotazioneId).subscribe({
        next: () => {
          console.log('Prenotazione eliminata con successo!');
          this.prenotazioni = this.prenotazioni.filter(p => p.prenotazioneId !== prenotazioneId);  // Rimuovi la prenotazione dalla lista
        },
        error: (error) => {
          console.error('Errore durante l\'eliminazione della prenotazione', error);
        }
      });
    }
  }

  // Modifica una prenotazione
  editPrenotazione(prenotazioneId: number): void {
    this.router.navigate(['/modifica-prenotazione', prenotazioneId]);
  }
}
