import {
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideQuillConfig } from 'ngx-quill/config';
import {
  MIA_CORE_PROVIDER,
  MIA_GOOGLE_STORAGE_PROVIDER,
} from '@doroteati/mia-core';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideQuillConfig({
      suppressGlobalRegisterWarning: true,
    }),
    provideClientHydration(withEventReplay()),
    {
      provide: MIA_CORE_PROVIDER,
        useValue: {
        baseUrl: environment.apiBaseUrl,
      },
    },
    {
      provide: MIA_GOOGLE_STORAGE_PROVIDER,
      useValue: {
        bucket: environment.googleStorageBucket,
      },
    },
  ],
};
