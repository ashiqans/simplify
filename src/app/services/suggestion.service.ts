import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  userid: string;
  username: string;
  userpassword: string;
  usermobnum: string;
  useremail: string;
  usercity: string;
}

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  baseURL: string = 'http://rajarajan-001-site1.ctempurl.com';
  private authorBook = new BehaviorSubject([]);
  private getAuthorBooks = this.authorBook.asObservable();

  constructor(private http: HttpClient) { }

  getSuggestionList(payload: any): Observable<any> {
    return this.http.post(`${this.baseURL}/SuggestionList`, payload);
  }

  createSuggestion(payload: any): Observable<any> {
    return this.http.post(`${this.baseURL}/CreateSuggestion`, payload);
  }

  filterSuggestion(payload: any): Observable<any> {
    return this.http.post(`${this.baseURL}/SuggestionList`, payload);
  }

  department() {
    return this.http.get<any>(`${this.baseURL}/MstDepartment`);
  }

  line(id: number) {
    return this.http.get<any>(`${this.baseURL}/MstLine?DeptID=${id}`);
  }

  zone(id: number) {
    return this.http.get<any>(`${this.baseURL}/MstZone?LineID=${id}`);
  }

  setAuthorBook(books: []) {
    this.authorBook.next(books);
  }

  getAuthorBook() {
    return this.getAuthorBooks;
  }
}
