import { Route, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LayoutComponent } from '../ui/component/layout.component';
import { HomeStore } from 'src/app/+home/data-access/store/home.store';

export const shellRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [() => {
            const iSi = inject(HomeStore).selectSignal(s => s.isLogin)();
            if (iSi) return true
            return inject(Router).createUrlTree(['/login']);
        }],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },
            {
                path: 'home',
                loadChildren: () => import('../../+home/home.routes'),
            },
        ],
    },
    {
        path: 'login',
        canActivate: [() => !inject(HomeStore).selectSignal(s => s.isLogin)()],
        loadComponent: () => import('../../+auth/ui/login.component').then(m => m.LoginComponent),
    }
];
