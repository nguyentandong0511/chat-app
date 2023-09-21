import { Route } from '@angular/router';

const HOME_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () => import('./ui/home.component').then(m => m.HomeComponent),
    }
];

export default HOME_ROUTES;
