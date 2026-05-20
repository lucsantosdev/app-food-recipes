import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search/search';
import { finalize } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface SearchRecipe {
  id: number;
  title: string;
  image: string;
}

interface SearchResponse {
  results: SearchRecipe[];
}

@Component({
  selector: 'app-search',
  imports: [NgFor, NgIf, RouterLink, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit{
  public loading = false;
  public query = '';
  public foods: SearchRecipe[] = [];
  public feedback = 'Search for a recipe to start.';

  constructor(private service: SearchService) {}

  ngOnInit(): void {
    
  }

  getSearch() {
    const safeQuery = this.query.trim();
    if (!safeQuery) {
      this.feedback = 'Please enter a search term.';
      this.foods = [];
      return;
    }

    this.loading = true
    this.feedback = '';
    this.service.searchFood(safeQuery).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (dataResponse) => {
        const response = dataResponse as SearchResponse;
        this.foods = response.results ?? [];
        this.feedback = this.foods.length ? '' : 'No recipes found for this search.';
      },
      error: () => {
        this.foods = [];
        this.feedback = 'Unable to complete the search at this time.';
      }
    })
  }

}
