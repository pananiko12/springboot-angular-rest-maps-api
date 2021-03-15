import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private baseUrl = 'http://localhost:8080/api/employees';
  constructor(private httpClient: HttpClient) { }

  getLongAndLat(address:string,city:string): Observable<any[]> {
    return this.httpClient.get<any[]>(`https://maps.googleapis.com/maps/api/geocode/json?address=`+address+`+`+city+`&key=AIzaSyByLm2l4ihrQ3-_tDg66YIpMMVABhL6ZHc`);
  }
}
