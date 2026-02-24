import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.page').then( m => m.SignInPage)
  },
  {
    path: 'selection-rol',
    loadComponent: () => import('./selection-rol/selection-rol.page').then( m => m.SelectionRolPage)
  },
  {
    path: 'sign-up-client',
    loadComponent: () => import('./sign-up-client/sign-up-client.page').then( m => m.SignUpClientPage)
  },
  {
    path: 'sign-up-professional',
    loadComponent: () => import('./sign-up-professional/sign-up-professional.page').then( m => m.SignUpProfessionalPage)
  },
  {
    path: 'verify-email',
    loadComponent: () => import('./verify-email/verify-email.page').then( m => m.VerifyEmailPage)
  },
  {
    path: 'verify-identity',
    loadComponent: () => import('./verify-identity/verify-identity.page').then( m => m.VerifyIdentityPage)
  },
  {
    path: 'profile-edit-client',
    loadComponent: () => import('./profile-edit-client/profile-edit-client.page').then( m => m.ProfileEditClientPage)
  },
  {
    path: 'profile-edit-professional',
    loadComponent: () => import('./profile-edit-professional/profile-edit-professional.page').then( m => m.ProfileEditProfessionalPage)
  },
  {
    path: 'home-client',
    loadComponent: () => import('./home-client/home-client.page').then( m => m.HomeClientPage)
  },
  {
    path: 'home-professional',
    loadComponent: () => import('./home-professional/home-professional.page').then( m => m.HomeProfessionalPage)
  },
  {
    path: 'search-a-professional',
    loadComponent: () => import('./search-a-professional/search-a-professional.page').then( m => m.SearchAProfessionalPage)
  },
  {
    path: 'professional-profile',
    loadComponent: () => import('./professional-profile/professional-profile.page').then( m => m.ProfessionalProfilePage)
  },
  {
    path: 'client-profile',
    loadComponent: () => import('./client-profile/client-profile.page').then( m => m.ClientProfilePage)
  },
  {
    path: 'chat-client',
    loadComponent: () => import('./chat-client/chat-client.page').then( m => m.ChatClientPage)
  },
  {
    path: 'chat-professional',
    loadComponent: () => import('./chat-professional/chat-professional.page').then( m => m.ChatProfessionalPage)
  },
  {
    path: 'configurations',
    loadComponent: () => import('./configurations/configurations.page').then( m => m.ConfigurationsPage)
  },
  {
    path: 'reviews',
    loadComponent: () => import('./reviews/reviews.page').then( m => m.ReviewsPage)
  },
  {
    path: 'payment',
    loadComponent: () => import('./payment/payment.page').then( m => m.PaymentPage)
  },
  {
    path: 'scanner-qr',
    loadComponent: () => import('./scanner-qr/scanner-qr.page').then( m => m.ScannerQRPage)
  },
  {
    path: 'chats-list',
    loadComponent: () => import('./chats-list/chats-list.page').then( m => m.ChatsListPage)
  },
];
