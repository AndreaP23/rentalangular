import { IColumnConfig } from './column-config';
import { IVeicoli } from '../models/Veicoli';
import { Router } from '@angular/router';

export const veicoloColumnsConfig = (router: Router): IColumnConfig<IVeicoli>[] => [
  { key: 'veicoloId', label: 'ID' },
  { key: 'anno', label: 'Anno' },
  { key: 'disponibilita', label: 'Disponibilità' },
  { key: 'marca', label: 'Marca' },
  { key: 'modello', label: 'Modello' },
  {
    label: 'Azioni',
    actions: [
      {
        label: 'Prenota',
        callback: (item?: IVeicoli) => {  
          if (item) {
            router.navigate(['/prenotazioneveicolo', item.veicoloId]);  
          } else {
            console.error('Veicolo non definito');
          }
        },
        class: 'btn-primary btn-sm'
      }
    ]
  }
];
