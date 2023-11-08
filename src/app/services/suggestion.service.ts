import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  fileUpload(file: File, name: string): Observable<any> {
    let formParams = new FormData();
    formParams.append('file', file, name);
    return this.http.post(`${this.baseURL}/UploadImage`, formParams);
  }

  getSuggestionDetail(sugId: any, loginId: any): Observable<any> {
    return this.http.post(`${this.baseURL}/SuggestionDetail?SuggestionID=${sugId}&LoginID=${loginId}`, sugId);
  }

  updateStage(stage: number, payload: any): Observable<any> {
    return this.http.post(`${this.baseURL}/UpdateStage${stage}`, payload);
  }  

  updateStageTwo(payload: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.baseURL}/UpdateStage2`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  updateStageFive(payload: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.baseURL}/UpdateStage5`, payload);
  }



  setAuthorBook(books: []) {
    this.authorBook.next(books);
  }

  getAuthorBook() {
    return this.getAuthorBooks;
  }
}
