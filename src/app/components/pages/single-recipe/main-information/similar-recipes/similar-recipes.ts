import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SingleRecipe } from '../../../../../services/single-recipe/single-recipe';
import { finalize } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

interface SimilarRecipe {
  id: number;
  title: string;
  readyInMinutes: number;
}

@Component({
  selector: 'app-similar-recipes',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './similar-recipes.html',
  styleUrl: './similar-recipes.css',
})
export class SimilarRecipes implements OnInit, OnChanges {
  public loading = true;
  public similarRecipes: SimilarRecipe[] = [];
  public error = '';

  @Input() recipeIdSimilar!: number

  constructor(private service: SingleRecipe) {}

  ngOnInit(): void {
    this.takeSimilarRecipes(this.recipeIdSimilar)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipeIdSimilar'] && !changes['recipeIdSimilar'].firstChange) {
      this.takeSimilarRecipes(this.recipeIdSimilar);
    }
  }

  takeSimilarRecipes(id: number) {
    if (!id) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.service.takeSimilarRecipes(id).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (dataResponse) => {
        this.similarRecipes = (dataResponse as SimilarRecipe[]).slice(0, 3);
      },
      error: () => {
        this.similarRecipes = [];
        this.error = 'Nao foi possivel carregar receitas similares.';
      },
    })
  }

}
