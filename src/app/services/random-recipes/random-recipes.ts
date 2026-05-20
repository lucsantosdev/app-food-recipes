import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments'

@Injectable({
  providedIn: 'root',
})
export class RandomRecipes {
  constructor(private http: HttpClient) {}

  listRandomFood(take: number) {
    const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${environment.apiKey}&number=${take}`;
    return this.http.get(apiUrl);
  }
}
