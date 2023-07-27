import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const USERS_ENDPOINT = '/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const url = `${this.baseUrl}${USERS_ENDPOINT}`;
    return this.http.get<any>(url);
  }

  getUserById(id: number): Observable<any> {
    const url = `${this.baseUrl}${USERS_ENDPOINT}/${id}`;
    return this.http.get<any>(url);
  }

  createUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}${USERS_ENDPOINT}`;
    return this.http.post<any>(url, userData);
  }

  updateUser(id: number, userData: any): Observable<any> {
    const url = `${this.baseUrl}${USERS_ENDPOINT}/${id}`;
    return this.http.put<any>(url, userData);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.baseUrl}${USERS_ENDPOINT}/${id}`;
    return this.http.delete<any>(url);
  }
}
