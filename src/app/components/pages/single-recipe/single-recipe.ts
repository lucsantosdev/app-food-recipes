import { Component } from '@angular/core';
import { MainInformation } from "./main-information/main-information";

@Component({
  selector: 'app-single-recipe',
  imports: [MainInformation],
  templateUrl: './single-recipe.html',
  styleUrl: './single-recipe.css',
})
export class SingleRecipe {}
