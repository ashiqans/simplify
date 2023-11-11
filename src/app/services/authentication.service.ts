import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Auth {
  username: string;
  password: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  isLoggedIn: boolean = false;
  baseURL: string = "http://rajarajan-001-site1.ctempurl.com";

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>('');
    this.currentUser = this.currentUserSubject.asObservable();
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') == 'true' ? true : false;
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(userObj: any) {
    return this.http.post(`${this.baseURL}/Login`, userObj)
      .pipe(map((user: any) => {
        // let jwtToken = user?.jwtToken;
        // sessionStorage.setItem('authToken', jwtToken);
        sessionStorage.setItem('isLoggedIn', 'true');
        // this.currentUserSubject.next(jwtToken);
        return user;
      }));
  }

  updatePassword(userObj: any) {
    return this.http.post(`${this.baseURL}/UpdatePassword`, userObj)
      .pipe(map((user: any) => {
        sessionStorage.setItem('isLoggedIn', 'true');
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('authToken');
    sessionStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['login']);
  }

  test1(testObj: any) {
    return this.http.post(`${this.baseURL}/CreateSuggestion`, testObj)
      .pipe(map((user: any) => {
        return user;
      }));
  }

  test2() {
    return this.http.get(`${this.baseURL}/MstZone?LineID=3`)
      .pipe(map((user: any) => {
        return user;
      }));
  }
}