import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BedroomService {

  private apiUrl: string = environment.apiUrl + '/hotel';
  private bed: string = 'bedroom';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Aquí puedes agregar cabeceras personalizadas si es necesario
    return new HttpHeaders();
  }

  getAllBedroom(id: number): Observable<any[]> {
    const url = `${this.apiUrl}/${id}/${this.bed}`;
    return this.http.get<Hotel[]>(url, { headers: this.getHeaders() });
  }

  getBedroomById(hotelId:number, id: number): Observable<any> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}/${id}`;
    return this.http.get<Hotel>(url, { headers: this.getHeaders() });
  }

  createBedroom(hotelId:number, bedroom: any): Observable<any> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}`;
    return this.http.post<Hotel>(url, bedroom, { headers: this.getHeaders() });
  }

  updateBedroom(hotelId:number, bedroomId: number, bedroom: any): Observable<any> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}/${bedroomId}`;
    return this.http.put<Hotel>(url, bedroom, { headers: this.getHeaders() });
  }

  deleteBedroom(hotelId:number,id: number): Observable<void> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
