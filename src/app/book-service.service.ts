import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import Book from './Model/book';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private apiUrl = 'http://localhost:8080/api/v1/book/';

  constructor(private http: HttpClient) { }

  getBooks(param: any): Observable<Book[]> {
    const params = new HttpParams().set(param.key, param.value);

    return this.http.get<Book[]>(this.apiUrl, { params });
  }

  getAuthors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/authors`).pipe(
      map(authorArr => authorArr.map(author => ({ value: author._id, viewValue: author.author })))
    );
  }

  deleteBook(id: string): Observable<Book> {
    return this.http.delete<Book>(`${this.apiUrl}${id}`);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}${id}`, book);
  }

  saveBook(book: Book): Observable<Book | any> {
    return this.http.post<Book>(this.apiUrl, book);
  }
}
