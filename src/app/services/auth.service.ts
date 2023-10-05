import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";

import { env } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base_url : String = env.API_BASE_URL;

  constructor(private httpClient : HttpClient, private jwtHelper: JwtHelperService) { }

  login(data : any) : Observable <any> {
    return this.httpClient.post<any>(this.base_url + '/login', data);
  }

  logout() : Observable <any> {
    return this.httpClient.post(this.base_url + '/logout', {});
  }

  verify() : Observable <any> {
    return this.httpClient.get(this.base_url + '/verify');
  }

  isAdmin(): boolean {
    let result = false;

    const tokenData = this.jwtHelper.decodeToken();
    if (tokenData)
      result = tokenData.role === 'ADMIN';

    return result;
  }
}
