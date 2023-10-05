import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private base_uri : string = env.API_BASE_URL + '/users';

  constructor(private httpClient : HttpClient) { }

  public getAll() : Observable<any> {
    return this.httpClient.get(this.base_uri);
  }

  public getOne(id : any) : Observable<any> {
    return this.httpClient.get(this.base_uri + '/' + id);
  }

  public store(data : any) : Observable <any> {
    return this.httpClient.post(this.base_uri, data);
  }

  public update(id : any, data : any) : Observable <any> {
    return this.httpClient.put(this.base_uri + '/' + id, data);
  }

  public destroy(id : any) : Observable <any> {
    return this.httpClient.delete(this.base_uri + '/' + id);
  }
}
