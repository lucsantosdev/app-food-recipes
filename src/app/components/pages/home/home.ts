import { Component } from '@angular/core';
import { FoodCard } from "./food-card/food-card";

@Component({
  selector: 'app-home',
  imports: [FoodCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
