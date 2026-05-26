import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';
import { environment } from '../../../environments/environments'

@Injectable({
  providedIn: 'root',
})
export class SingleRecipe {

  constructor(private http: HttpClient) {}

  takeRecipe(id: number) {
    const apiUrl = `${environment.apiBaseUrl}?endpoint=recipe&id=${id}`;
    return this.http.get(apiUrl).pipe(timeout(15000));
  }

  takeSimilarRecipes(id: number) {
    const apiUrl = `${environment.apiBaseUrl}?endpoint=similar&id=${id}`;
    return this.http.get(apiUrl).pipe(timeout(15000));
  }
}
