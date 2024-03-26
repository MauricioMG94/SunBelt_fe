import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedContactInfoService {
  private responseData: any;

  setResponseData(data: any) {
    this.responseData = data;
  }

  getResponseData() {
    return this.responseData;
  }
}
