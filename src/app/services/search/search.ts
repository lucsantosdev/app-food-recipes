import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  constructor(private http: HttpClient) {}

  searchFood(query: string) {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${environment.apiKey}&query=${encodeURIComponent(query)}&number=10`;
    return this.http.get(apiUrl);
  }

}
