import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Book from './Model/book';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private apiUrl = 'http://localhost:8080/api/v1/book/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  deleteBook(id: string): Observable<Book> {
    return this.http.delete<Book>(`${this.apiUrl}${id}`);
  }

}
