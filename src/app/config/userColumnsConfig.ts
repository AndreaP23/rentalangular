import { IColumnConfig } from './column-config';
import { IUsers } from '../models/Users';

export const userColumnsConfig: IColumnConfig<IUsers>[] = [
  { key: 'userId', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'cognome', label: 'Cognome' },
  { key: 'email', label: 'Email' },
  { key: 'telefono', label: 'Telefono' },
  {
    label: 'Azioni',
    actions: [
      {
        label: 'Elimina',
        callback: (item?: IUsers) => {  
          if (item) {  
            console.log('Elimina utente:', item);
          } else {
            console.error('Elemento non definito');
          }
        },
        class: 'btn-danger btn-sm'
      }
    ]
  }
];
