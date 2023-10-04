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
export class UserService {
  baseURL: string = 'https://rajarajanshan115.bsite.net';
  private authorBook = new BehaviorSubject([]);
  private getAuthorBooks = this.authorBook.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<User>(`${this.baseURL}/api/getuserlist`);
  }

  addUser(payload: any): Observable<any> {
    return this.http.post(`${this.baseURL}/api/adduser`, payload);
  }

  updateUser(payload: any): Observable<any> {
    return this.http.post(`${this.baseURL}/api/updateuser`, payload);
  }

  deleteUser(payload: any): Observable<any> {
    return this.http.post(`${this.baseURL}/api/deleteuser`, payload);
  }

  setAuthorBook(books: []) {
    this.authorBook.next(books);
  }

  getAuthorBook() {
    return this.getAuthorBooks;
  }
}
