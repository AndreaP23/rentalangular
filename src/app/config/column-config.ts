import { IUsers } from '../models/Users';
import { IVeicoli } from '../models/Veicoli';

//Utilizzo T per utilizzare diversi tipi di Oggetti
export interface IColumnConfig<T> {
  key: keyof T; 
  label: string;
}

//Configurazione per la tabella Veicolo
export const veicoloColumnsConfig: IColumnConfig<IVeicoli>[] = [
  { key: 'veicoloId', label: 'ID' },
  { key: 'anno', label: 'Anno' },
  { key: 'disponibilita', label: 'Disponibilità' },
  { key: 'marca', label: 'Marca' },
  { key: 'modello', label: 'Modello' }
];

//Configurazione per la tabella User
export const userColumnsConfig: IColumnConfig<IUsers>[] = [
  { key: 'userId', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'cognome', label: 'Cognome' },
  { key: 'email', label: 'Email' },
  { key: 'telefono', label: 'Telefono' }
];
