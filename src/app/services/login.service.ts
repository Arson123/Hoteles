import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // Función para buscar un usuario por su ID
  getUserById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Función para guardar la información del usuario en el session storage
  saveUserToSessionStorage(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  // Función para obtener la información del usuario almacenada en el session storage
  getUserFromSessionStorage() {
    const userJson = sessionStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  // Función para eliminar la información del usuario del session storage
  clearUserFromSessionStorage() {
    sessionStorage.removeItem('user');
  }
}
