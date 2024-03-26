import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  private baseUrl = 'http://localhost:8090';

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
