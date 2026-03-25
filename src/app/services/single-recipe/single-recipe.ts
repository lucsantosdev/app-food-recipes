import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SingleRecipe {

  constructor(private http: HttpClient) {}

  takeRecipe(id: number) {
    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${environment.apiKey}`;
    return this.http.get(apiUrl);
  }

  takeSimilarRecipes(id: number) {
    const apiUrl = `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${environment.apiKey}`;
    return this.http.get(apiUrl);
  }
}
