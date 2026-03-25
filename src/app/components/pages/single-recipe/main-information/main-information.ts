import { Component, OnInit } from '@angular/core';
import { SingleRecipe } from '../../../../services/single-recipe/single-recipe';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { SimilarRecipes } from "./similar-recipes/similar-recipes";
import { DecimalPipe, NgIf } from '@angular/common';

interface RecipeDetail {
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  pricePerServing: number;
  vegetarian: boolean;
  vegan: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  sourceUrl: string;
  image: string;
  summary?: string;
}

@Component({
  selector: 'app-main-information',
  imports: [SimilarRecipes, NgIf, DecimalPipe],
  templateUrl: './main-information.html',
  styleUrl: './main-information.css',
})
export class MainInformation implements OnInit{
  public loading = true;
  public recipeId = 0;
  public food: RecipeDetail | null = null;
  public recipeIdSimilar = 0;
  public error = '';

  constructor(
    private service: SingleRecipe, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRecipeId();
  }

  getRecipeId() {
    this.route.queryParams.subscribe((queryParams) => {
      this.recipeId = Number(queryParams['id'] ?? 0);
      this.recipeIdSimilar = this.recipeId;

      if (this.recipeId > 0) {
        this.takeRecipe(this.recipeId);
        return;
      }

      this.loading = false;
      this.error = 'Receita invalida. Escolha uma receita na listagem.';
    });
  }

  takeRecipe(id: number) {
    this.loading = true;
    this.error = '';

    this.service.takeRecipe(id).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (dataResponse) => {
        this.food = dataResponse as RecipeDetail;
      },
      error: () => {
        this.food = null;
        this.error = 'Nao foi possivel carregar os detalhes desta receita.';
      },
    });
  }
}
