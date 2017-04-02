import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';


import 'rxjs/add/operator/map'

import {AuthConfig, AuthHttp, JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
    public token: string;

    private apiUrl;
    private registerUrl;
    private refreshUrl;

    public currentUsername;
    jwtHelper = new JwtHelper();

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        if (localStorage.getItem(('currentUser'))) {
          this.currentUsername = this.jwtHelper.decodeToken(localStorage.getItem('currentUser')).username;
        }
        this.apiUrl = 'http://placelist.pythonanywhere.com/login/';
        this.registerUrl = 'http://placelist.pythonanywhere.com/register/';
        this.refreshUrl = 'http://placelist.pythonanywhere.com/token-refresh/';
    }

    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({ username: username, password: password });
        return this.http.post(this.apiUrl, body, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    console.log(this.token);
                    this.currentUsername = username;
                    console.log(this.currentUsername)
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    // return true to indicate successful login
                    return true;
                }

                else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    refreshToken() {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify({'token': this.token});
      return this.http.post(this.refreshUrl, body, options).toPromise()
          .then(response => {
            let token = response.json() && response.json().token;
            if (token) {
                  // set token property
                  this.token = token;
                  console.log(this.token);
                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify({ username: this.currentUsername, token: token }));
                  console.log(this.jwtHelper.getTokenExpirationDate(localStorage.getItem('currentUser')))
                  // return true to indicate successful login
                  return true;
              }

              else {
                  // return false to indicate failed login
                  console.log(response)
                  return false;
              }

          });
    }


  register(email:string, username: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({ email: email, username: username, password: password });
    return this.http.post(this.registerUrl, body, options).toPromise()
   .then(response => this.currentUsername = response.json().username)
   .catch(this.handleError);
  }

   private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
   }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.currentUsername = null;
    }


}
