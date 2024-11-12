import { IPrenotazioni } from '../models/Prenotazioni';
import { IUsers } from '../models/Users';
import { IVeicoli } from '../models/Veicoli';

//Utilizzo T per utilizzare diversi tipi di Oggetti
export interface IColumnConfig<T> {
  key?: keyof T; 
  label: string;
  actions?: IAction<T>[];
}

export interface IAction<T> {
  label: string;
  callback: (item?: T) => void;
  class?: string;  
  icon?: string;  
}


//Gestione visibilità, aggiungere azioni per il singolo, vista e dettaglio. Crezione, eliminazione e modifica. 2 Azioni per record, 
//1 - Cancellare utenti e prenotazioni (admin) aggiungere prenotazione (customer) , Deve essere il padre a passare. 
//2 - Creare Api Delete FATTO per Utenti
//Prenotazione Veicolo craere il form
//Registrazione
//Inserimento Veicolo (Customer e SuperAdmin) 
//Implementare Route Guard 
