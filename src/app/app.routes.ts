import { Routes } from '@angular/router';
import { GuestComponent } from '@authComponents/guest/guest.component';
import { SignUpComponent } from '@authComponents/sign-up/sign-up.component';
import { SignInComponent } from '@authComponents/sign-in/sign-in.component';
import { UserHomePageComponent } from './components/user-home-page/user-home-page.component';
import { authGuard, authGuardWithOutUser } from '@guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: SignUpComponent,
        canActivate: [authGuardWithOutUser]
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [authGuardWithOutUser]
    },
    {
        path: 'guest',
        component: GuestComponent,
        canActivate: [authGuardWithOutUser]
    },
    {
        path: 'home',
        component: UserHomePageComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        component: UserHomePageComponent,
        canActivate: [authGuard]
    },
];
