import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Environment } from 'env';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: Environment.firebase.projectId,
        appId: Environment.firebase.appId,
        storageBucket: Environment.firebase.storageBucket,
        apiKey: Environment.firebase.apiKey,
        authDomain: Environment.firebase.authDomain,
        messagingSenderId: Environment.firebase.messagingSenderId,
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
