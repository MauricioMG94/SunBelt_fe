import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  async getPersonInfo(docType: string, idNumber: string): Promise<any> {
    const url = `${this.baseUrl}/personas/identification/${docType}/${idNumber}`;
    try {
      const response = await this.http.get<any>(url).toPromise();
      return response;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }
}
