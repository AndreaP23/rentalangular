import { Component, OnInit } from '@angular/core';
import { IUsers } from '../../models/Users';
import { SuperUserService } from '../../core/services/superuser.service';
import { UserServiceService } from '../../core/services/Data/user-service.service';
import { IAction, IColumnConfig} from '../../config/column-config';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { Router } from '@angular/router';
import { userColumnsConfig } from '../../config/userColumnsConfig';
import { Page } from '../../models/Page';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utenti',
  standalone: true,
  imports: [GenericListComponent,CommonModule],
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtentiComponent implements OnInit {
  users: IUsers[] = [];
  columnsConfig: IColumnConfig<IUsers>[] = [];
  totalElements: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;

  emailFilter: string = '';
  nameFilter: string = '';

  constructor(private userService: UserServiceService, private superUserService: SuperUserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers(); 
    this.initializeColumns();
  }

  getUsers(): void {
    this.userService.getUsers(this.currentPage, this.pageSize, this.emailFilter, this.nameFilter)
      .subscribe({
        next: (page: Page<IUsers>) => {
          console.log('Backend Response:', page);  
  
          this.users = page.content;
          this.totalElements = page.totalElements;
          this.pageSize = page.size;  
          this.totalPages = page.totalPages;  
  
          /* Log verifica elementi ricevuti
          console.log(`Total Elements: ${this.totalElements}`);
          console.log(`Page Size: ${this.pageSize}`);
          console.log(`Total Pages: ${this.totalPages}`);
          */
        },
        error: (error) => {
          console.error('Errore nel caricamento degli utenti', error);
        },
        complete: () => {
          console.log('Caricamento utenti completato');
        }
      });
  }
  

  // Funzione per eliminare l'utente
  onDeleteUser(user: IUsers): void {
    if (confirm('Sei sicuro di voler eliminare questo utente?')) {
      this.superUserService.deleteUser(user.userId).subscribe({
        next: () => {
          this.getUsers(); 
        },
        error: (error) => {
          console.error('Errore durante l\'eliminazione dell\'utente', error);
        },
        complete: () => {
          console.log('Eliminazione dell\'utente completata.');
        }
      });
    }
  }

  initializeColumns(): void {
    this.columnsConfig = userColumnsConfig.map((column) => {
      if (column.label === 'Azioni' && column.actions) {
        column.actions = column.actions.map(action => {
          if (action.label === 'Elimina') {
            return {
              ...action,
              callback: (item?: IUsers) => {
                if (item) {
                  this.onDeleteUser(item);
                }
              }
            };
          }
          return action;
        });
      }
      return column;
    });
  }

  onAddUser(): void {
    this.router.navigate(['/register']);
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {  
      //console.log('Changing page to:', page);
      this.currentPage = page;
      this.getUsers();
    } else {
      console.log('Invalid page change attempt. Current page:', this.currentPage, 'Total pages:', this.totalPages);
    }
  }
  

  getPaginationPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);

  }

  generalActions: IAction<IUsers>[] = [
    {
      label: 'Aggiungi Utente',
      icon: 'fas fa-plus', 
      callback: () => this.onAddUser(),
      class: 'btn-success'
    }
  ];
}
