import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search/search';
import { finalize } from 'rxjs';
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
  imports: [RouterLink, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit{
  public loading = false;
  public query = '';
  public foods: SearchRecipe[] = [];
  public feedback = 'Search for a recipe to start.';

  constructor(
    private service: SearchService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
  }

  getSearch() {
    const safeQuery = this.query.trim();
    if (!safeQuery) {
      this.feedback = 'Please enter a search term.';
      this.foods = [];
      this.cdr.detectChanges();
      return;
    }

    this.loading = true
    this.feedback = '';
    this.service.searchFood(safeQuery).pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (dataResponse) => {
        const response = dataResponse as SearchResponse;
        this.foods = response.results ?? [];
        this.feedback = this.foods.length ? '' : 'No recipes found for this search.';
        this.cdr.detectChanges();
      },
      error: () => {
        this.foods = [];
        this.feedback = 'Unable to complete the search at this time.';
        this.cdr.detectChanges();
      }
    })
  }

}
