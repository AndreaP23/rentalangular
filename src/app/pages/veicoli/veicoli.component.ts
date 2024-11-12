import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IVeicoli } from '../../models/Veicoli';
import { VeicoliServiceService } from '../../core/services/Data/veicoli-service.service'; 
import { GenericListComponent } from '../../generic-list/generic-list.component'; 
import { IColumnConfig } from '../../config/column-config';
import { veicoloColumnsConfig } from '../../config/veicoloColumnsConfig';

@Component({
  selector: 'app-veicoli',
  standalone: true,
  imports: [GenericListComponent],
  templateUrl: './veicoli.component.html',
  styleUrls: ['./veicoli.component.css']
})
export class VeicoliComponent implements OnInit {
  veicoli: IVeicoli[] = [];  // Dati dei veicoli
  columnsConfig: IColumnConfig<IVeicoli>[] = [];  // Configurazione delle colonne
  totalPages: number = 0;  // Numero totale di pagine
  currentPage: number = 0;  // Pagina corrente
  pageSize: number = 10;  // Dimensione della pagina

  constructor(private router: Router, private veicoliService: VeicoliServiceService) { }

  ngOnInit(): void {
    this.columnsConfig = veicoloColumnsConfig(this.router);
    this.loadVeicoli();  // Carica i veicoli al caricamento del componente
  }

  // Metodo per caricare i veicoli con paginazione
  private loadVeicoli(page: number = 0): void {
    this.veicoliService.getVeicoli(page, this.pageSize).subscribe(
      (pageData) => {
        this.veicoli = pageData.content;  // Estrai la lista di veicoli
        this.totalPages = pageData.totalPages;  // Imposta il numero totale di pagine
        this.currentPage = pageData.number;  // Imposta il numero di pagina corrente
      },
      error => {
        console.error('Errore nel caricamento dei veicoli', error);
      }
    );
  }

  // Metodo per cambiare pagina
  onPageChange(page: number): void {
    this.loadVeicoli(page);
  }
}
