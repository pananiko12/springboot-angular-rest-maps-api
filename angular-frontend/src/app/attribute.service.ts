import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attribute } from './attribute';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private baseUrl = 'http://localhost:8080/api/attributes';
  constructor(private httpClient: HttpClient) { }

  getAttributesList(): Observable<Attribute[]> {
    return this.httpClient.get<Attribute[]>(`${this.baseUrl}`);
  }

  createAttribute(attribute: Attribute): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, attribute);
  }

  getAttributeById(id: number): Observable<Attribute> {
    return this.httpClient.get<Attribute>(`${this.baseUrl}/${id}`);
  }

  updateAttribute(id: number, attribute: Attribute): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, attribute);
  }

  deleteAttribute(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
