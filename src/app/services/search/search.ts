import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  constructor(private http: HttpClient) {}

  searchFood(query: string) {
    const apiUrl = `${environment.apiBaseUrl}?endpoint=search&query=${encodeURIComponent(query)}`;
    return this.http.get(apiUrl);
  }

}
