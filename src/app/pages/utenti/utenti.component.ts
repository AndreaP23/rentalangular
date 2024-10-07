import { Component, OnInit } from '@angular/core';
import { IUsers } from '../../models/Users';
import { UserServiceService } from '../../core/services/Data/user-service.service';
import { IColumnConfig, userColumnsConfig } from '../../config/column-config';
import { GenericListComponent } from '../../generic-list/generic-list.component'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-utenti',
  standalone: true,
  imports: [GenericListComponent], 
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']  
})
export class UtentiComponent implements OnInit {
  users: IUsers[] = [];  
  columnsConfig: IColumnConfig<IUsers>[] = userColumnsConfig;

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    this.getUsers(); 
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data: IUsers[]) => {
        this.users = data; 
      },
      error => {
        console.error('Errore nel caricamento degli utenti', error);
      }
    );
  }
}
