import { Routes } from '@angular/router';
import { GuestComponent } from '@authComponents/guest/guest.component';
import { SignUpComponent } from '@authComponents/sign-up/sign-up.component';
import { SignInComponent } from '@authComponents/sign-in/sign-in.component';
import { UserHomePageComponent } from './components/user-home-page/user-home-page.component';

export const routes: Routes = [
    {
        path: '',
        component: SignUpComponent
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'guest',
        component: GuestComponent
    },
    {
        path: 'home',
        component: UserHomePageComponent
    },
];
