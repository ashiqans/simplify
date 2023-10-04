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
  baseURL: string = "https://rajarajanshan115.bsite.net";

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>('');
    this.currentUser = this.currentUserSubject.asObservable();
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') == 'true' ? true : false;
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(userObj: any) {
    return this.http.post(`${this.baseURL}/api/login`, userObj)
      .pipe(map((user: any) => {
        let jwtToken = user?.jwtToken;
        sessionStorage.setItem('authToken', jwtToken);
        sessionStorage.setItem('isLoggedIn', 'true');
        this.currentUserSubject.next(jwtToken);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('authToken');
    sessionStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['login']);
  }
}