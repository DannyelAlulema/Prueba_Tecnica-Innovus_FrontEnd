import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private base_url : string = env.API_BASE_URL;

  constructor(private httpClient : HttpClient) { }

  index() : Observable <any> {
    return this.httpClient.get(this.base_url);
  }
}
