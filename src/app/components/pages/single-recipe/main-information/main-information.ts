import { Component, OnInit } from '@angular/core';
import { SingleRecipe } from '../../../../services/single-recipe/single-recipe';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { SimilarRecipes } from "./similar-recipes/similar-recipes";
import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

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
  imports: [SimilarRecipes, DecimalPipe],
  templateUrl: './main-information.html',
  styleUrl: './main-information.css',
})
export class MainInformation implements OnInit{
  public loading = true;
  public recipeId = 0;
  public food: RecipeDetail | null = null;
  public recipeIdSimilar = 0;
  public error = '';
  private queryParamsSubscription?: Subscription;
  private loadingGuardTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private service: SingleRecipe, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRecipeId();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
    this.clearLoadingGuard();
  }

  getRecipeId() {
    this.applyRecipeIdFromValue(this.route.snapshot.queryParamMap.get('id'));

    this.queryParamsSubscription = this.route.queryParams.subscribe((queryParams) => {
      this.applyRecipeIdFromValue(queryParams['id']);
    });
  }

  takeRecipe(id: number) {
    this.clearLoadingGuard();
    this.loading = true;
    this.error = '';

    this.loadingGuardTimer = setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.food = null;
        this.error = 'A requisicao demorou demais. Tente novamente em instantes.';
      }
    }, 20000);

    this.service.takeRecipe(id).pipe(
      finalize(() => {
        this.loading = false;
        this.clearLoadingGuard();
      })
    ).subscribe({
      next: (dataResponse) => {
        if (this.isRecipeDetail(dataResponse)) {
          this.food = dataResponse;
          return;
        }

        this.food = null;
        this.error = 'Receita nao encontrada para este ID.';
      },
      error: (errorResponse: unknown) => {
        this.food = null;
        this.error = this.resolveRecipeError(errorResponse);
      },
    });
  }

  private applyRecipeIdFromValue(value: unknown) {
    const incomingId = Number(value ?? 0);

    if (!Number.isInteger(incomingId) || incomingId <= 0) {
      this.recipeId = 0;
      this.recipeIdSimilar = 0;
      this.food = null;
      this.loading = false;
      this.error = 'Receita invalida. Escolha uma receita na listagem.';
      this.clearLoadingGuard();
      return;
    }

    if (incomingId === this.recipeId && this.food) {
      return;
    }

    this.recipeId = incomingId;
    this.recipeIdSimilar = incomingId;
    this.takeRecipe(incomingId);
  }

  private clearLoadingGuard() {
    if (this.loadingGuardTimer) {
      clearTimeout(this.loadingGuardTimer);
      this.loadingGuardTimer = undefined;
    }
  }

  private resolveRecipeError(errorResponse: unknown): string {
    if (errorResponse instanceof HttpErrorResponse) {
      if (errorResponse.status === 404) {
        return 'Receita nao encontrada.';
      }

      if (errorResponse.status === 401) {
        return 'Erro de autenticacao da API no servidor.';
      }

      if (errorResponse.status === 429) {
        return 'Limite de requisicoes da API atingido. Tente novamente mais tarde.';
      }

      if (errorResponse.status >= 500) {
        return 'Erro no servidor ao buscar esta receita.';
      }
    }

    return 'Nao foi possivel carregar os detalhes desta receita.';
  }

  private isRecipeDetail(value: unknown): value is RecipeDetail {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const recipe = value as Partial<RecipeDetail>;
    return typeof recipe.id === 'number' && typeof recipe.title === 'string';
  }
}
