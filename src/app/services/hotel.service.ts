import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Aquí puedes agregar cabeceras personalizadas si es necesario
    return new HttpHeaders();
  }

  getAllHotels(): Observable<Hotel[]> {
    const url = `${this.apiUrl}/hotel`;
    return this.http.get<Hotel[]>(url, { headers: this.getHeaders() });
  }

  getHotelById(id: number): Observable<Hotel> {
    const url = `${this.apiUrl}/hotel/${id}`;
    return this.http.get<Hotel>(url, { headers: this.getHeaders() });
  }

  createHotel(hotel: Hotel): Observable<Hotel> {
    const url = `${this.apiUrl}/hotel`;
    return this.http.post<Hotel>(url, hotel, { headers: this.getHeaders() });
  }

  updateHotel(hotel: Hotel): Observable<Hotel> {
    const url = `${this.apiUrl}/hotel/${hotel.id}`;
    return this.http.put<Hotel>(url, hotel, { headers: this.getHeaders() });
  }

  deleteHotel(id: number): Observable<void> {
    const url = `${this.apiUrl}/hotel/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
