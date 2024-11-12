import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAction, IColumnConfig } from '../config/column-config'; 

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css']
})
// Utilizzo T per indicare un generico Oggetto.
export class GenericListComponent<T> {  
  @Input() items: T[] = [];  
  @Input() columnsConfig: IColumnConfig<T>[] = [];  
  @Input() generalActions: IAction<T>[] = [];
  @Input() title: string = '';

  @Input() totalPages: number= 0;
  @Input() currentPage: number= 0;
  

  @Output() pageChange = new EventEmitter<number>();

  getKeys(): (keyof T)[] {  
    return this.columnsConfig
      .filter(col => col.key !== undefined)  
      .map(col => col.key as keyof T);       
  }

  onPageClick(page: number): void{
    this.pageChange.emit(page);
  }
}
