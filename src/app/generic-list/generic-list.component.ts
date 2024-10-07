import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IColumnConfig } from '../config/column-config'; 

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css']
})
//Utilizzo T per indicare un generico Oggetto.
export class GenericListComponent<T> {  
  @Input() items: T[] = [];  
  @Input() columnsConfig: IColumnConfig<T>[] = [];  

  getKeys(): (keyof T)[] {  
    return this.columnsConfig.map(col => col.key);
  }
}
