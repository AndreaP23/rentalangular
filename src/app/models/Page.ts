export interface Page<T>{
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number; //Per farmi restituire il numero delle pagini correnti
    
}