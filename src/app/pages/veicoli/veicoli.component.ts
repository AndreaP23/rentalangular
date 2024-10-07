// src/app/pages/veicoli/veicoli.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IVeicoli } from '../../models/Veicoli';
import { VeicoliServiceService } from '../../core/services/Data/veicoli-service.service'; 
import { GenericListComponent } from '../../generic-list/generic-list.component'; 
import { IColumnConfig, veicoloColumnsConfig } from '../../config/column-config';

@Component({
  selector: 'app-veicoli',
  standalone: true,
  imports: [GenericListComponent],
  templateUrl: './veicoli.component.html',
  styleUrls: ['./veicoli.component.css']
})
export class VeicoliComponent implements OnInit {
  veicoli: IVeicoli[] = []; 
  columnsConfig: IColumnConfig<IVeicoli>[] = veicoloColumnsConfig; // Usa il tipo corretto

  constructor(private router: Router, private veicoliService: VeicoliServiceService) { }
  
  ngOnInit(): void {
    this.loadVeicoli(); 
  }

  private loadVeicoli(): void {
    this.veicoliService.getVeicoli().subscribe(
      (data: IVeicoli[]) => {
        this.veicoli = data; 
      },
      error => {
        console.error('Errore nel caricamento dei veicoli', error); 
      }
    );
  }
}
