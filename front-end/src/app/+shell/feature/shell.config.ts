import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { shellRoutes } from './shell.routes';

export const shellConfig: ApplicationConfig = {
    providers: [
        provideRouter(shellRoutes),
        provideAnimations(),
        importProvidersFrom([]),
        provideAnimations(),
    ],
};
