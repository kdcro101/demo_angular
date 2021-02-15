import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';

export interface Device {
    id: number
    name: string
    price: string
    type: string
}

export interface ApiDevices {
    devices: Device[]
}
export interface ApiMovies {
    categories: MovieItem[];
    movies: MovieItemChild[]

}
export interface MovieItem {
    id: number;
    name: string;
}
export interface MovieItemChild extends MovieItem {
    categories: number[];
}
export interface DataCache {
    movies: ApiMovies | null;
    devices: ApiDevices | null;
}
export type TodoStatus = "done" | "todo" | "started";
export interface ToDo {
    "name": string
    "status": TodoStatus
}

export interface ApiToDos {
    todos: ToDo[]
}


@Injectable({
    providedIn: 'root'
})
export class DataService {
    cacheTodos!: ApiToDos

    constructor(private http: HttpClient) { }

    public getData<T>(url: string): Observable<T> {
        return this.http.get(url).pipe(
            map((data) => data as T)
        )
    }

    getMovies(): Observable<ApiMovies> {
        return this.getData<ApiMovies>("/assets/movies-data.json")
    }
    getDevices(): Observable<ApiDevices> {
        return this.getData<ApiDevices>("/assets/devices.json")
    }
    getTodos(): Observable<ApiToDos> {
        if (this.cacheTodos) {
            return of(this.cacheTodos)
        }
        return this.getData<ApiToDos>("/assets/todo.json").pipe(
            tap((data)=>{
                if(data){
                    this.cacheTodos = data
                }
            })
        )
    }

}
