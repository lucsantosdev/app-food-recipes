import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { About } from './components/pages/about/about';
import { Search } from './components/pages/search/search';
import { SingleRecipe } from './components/pages/single-recipe/single-recipe';

export const routes: Routes = [
    {
        path: '', 
        component: Home
    },
    {
        path: 'about', 
        component: About
    },
    {
        path: 'search', 
        component: Search
    },
    {
        path: 'recipe', 
        component: SingleRecipe
    },
    {
        path: '**',
        redirectTo: ''
    }
];
