import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./complete-profile/complete-profile.module').then( m => m.CompleteProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule),

  },
  {
    path: 'swiper-pages',
    loadChildren: () => import('./swiper-pages/swiper-pages.module').then( m => m.SwiperPagesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'complete-profile',
    loadChildren: () => import('./complete-profile/complete-profile.module').then( m => m.CompleteProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-address',
    loadChildren: () => import('./add-address/add-address.module').then( m => m.AddAddressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'saved-address',
    loadChildren: () => import('./saved-address/saved-address.module').then( m => m.SavedAddressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule),
    canActivate: [AuthGuard]
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
