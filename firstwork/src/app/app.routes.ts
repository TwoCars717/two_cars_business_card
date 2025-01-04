import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'confirmation', loadChildren: () => import('./confirmation-page/confirmation-page.module').then(m => m.ConfirmationPageModule) },
    { path: '**', redirectTo: '' }
];
