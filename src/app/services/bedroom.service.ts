import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BedroomService {

  private apiUrl: string = environment.apiUrl + '/hotel';
  private bed: string = 'bedroom';
  private reserve: string = 'reserve';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders();
  }

  getAllBedroom(id: number): Observable<any[]> {
    const url = `${this.apiUrl}/${id}/${this.bed}`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }

  getBedroomById(hotelId:number, id: number): Observable<any> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  createBedroom(hotelId:number, bedroom: any): Observable<any> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}`;
    return this.http.post<any>(url, bedroom, { headers: this.getHeaders() });
  }

  updateBedroom(hotelId:number, bedroomId: number, bedroom: any): Observable<any> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}/${bedroomId}`;
    return this.http.put<any>(url, bedroom, { headers: this.getHeaders() });
  }

  deleteBedroom(hotelId:number,id: number): Observable<void> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }

  getAllReservations(hotelId: number, bedroomId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}/${bedroomId}/${this.reserve}`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }

  getReservationById(hotelId: number, bedroomId: number, reservationId: number): Observable<any> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}/${bedroomId}/${this.reserve}/${reservationId}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  createReservation(hotelId: number, bedroomId: number, reservation: any): Observable<any> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}/${bedroomId}/${this.reserve}`;
    return this.http.post<any>(url, reservation, { headers: this.getHeaders() });
  }

  updateReservation(hotelId: number, bedroomId: number, reservationId: number, reservation: any): Observable<any> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}/${bedroomId}/${this.reserve}/${reservationId}`;
    return this.http.put<any>(url, reservation, { headers: this.getHeaders() });
  }

  deleteReservation(hotelId: number, bedroomId: number, reservationId: number): Observable<void> {
    const url = `${this.apiUrl}/${hotelId}/${this.bed}/${bedroomId}/${this.reserve}/${reservationId}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
