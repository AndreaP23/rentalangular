import { IColumnConfig } from './column-config';
import { IPrenotazioni } from '../models/Prenotazioni';

export const prenotazioneColumnsConfig = (
  isSuperUser: boolean,
  deleteCallback: (id: number) => void,
  editCallback: (id: number) => void 
): IColumnConfig<IPrenotazioni>[] => [
  { key: 'prenotazioneId', label: 'ID' },
  { key: 'dataPrenotazione', label: 'Data Prenotazione' },
  { key: 'dataInizio', label: 'Data Inizio' },
  { key: 'dataFine', label: 'Data Fine' },
  ...(isSuperUser
    ? [
        {
          label: 'Azioni',
          actions: [
            {
              label: 'Elimina',
              callback: (item?: IPrenotazioni) => {
                if (item) {
                  deleteCallback(item.prenotazioneId);
                } else {
                  console.error('Elemento non definito');
                }
              },
              class: 'btn-danger btn-sm'
            },
            {
              label: 'Modifica',
              callback: (item?: IPrenotazioni) => {
                if (item) {
                  editCallback(item.prenotazioneId); 
                } else {
                  console.error('Elemento non definito');
                }
              },
              class: 'btn-warning btn-sm' 
            }
          ]
        }
      ]
    : [])
];
