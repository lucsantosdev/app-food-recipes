import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RandomRecipes } from '../../../../services/random-recipes/random-recipes';
import { finalize } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

interface RecipeCard {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  vegetarian: boolean;
  vegan: boolean;
}

interface RandomRecipesResponse {
  recipes: RecipeCard[];
}

@Component({
  selector: 'app-food-card',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './food-card.html',
  styleUrl: './food-card.css',
})
export class FoodCard implements OnInit {
  public foods: RecipeCard[] = [];
  public loading = true;
  public loadingMore = false;
  public loadingError = '';
  public readonly maxRecipes = 24;

  constructor(
    private service: RandomRecipes,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getFoods();
  }

  getFoods() {
    this.loading = true;

    this.service.listRandomFood(6).pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (dataResponse) => {
        const incoming = this.extractRecipes(dataResponse);

        if (!incoming.length) {
          this.loadingError = 'The API responded with no recipes at the moment. Please try again in a few seconds.';
          return;
        }

        this.foods = this.foods.concat(incoming);
        this.loadingError = '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingError = 'We were unable to load recipes right now. Please try again.';
        this.cdr.detectChanges();
      }
    })
  }

  loadMore() {
    if (!this.canLoadMore) {
      return;
    }

    this.loadingMore = true;
    this.service.listRandomFood(6).pipe(
      finalize(() => {
        this.loadingMore = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (dataResponse) => {
        const incoming = this.extractRecipes(dataResponse);
        if (!incoming.length) {
          this.loadingError = 'The API responded with no new recipes at the moment.';
          return;
        }

        this.foods = this.foods.concat(incoming);
        this.loadingError = '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingError = 'We were unable to load more recipes right now. Please try again.';
        this.cdr.detectChanges();
      }
    })
  }

  retryLoad() {
    this.foods = [];
    this.loadingError = '';
    this.getFoods();
  }

  private extractRecipes(dataResponse: unknown): RecipeCard[] {
    const response = dataResponse as Partial<RandomRecipesResponse>;
    if (Array.isArray(response.recipes)) {
      return response.recipes;
    }

    return [];
  }

  get canLoadMore() {
    return this.foods.length < this.maxRecipes;
  }

}
