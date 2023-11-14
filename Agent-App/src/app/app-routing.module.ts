import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro-page',
    pathMatch: 'full'
  },
  {
    path: 'intro-page',
    loadChildren: () => import('./intro-page/intro-page.module').then( m => m.IntroPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'order-details',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule),
     // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
