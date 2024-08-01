import { Routes } from '@angular/router';
import { LoginComponent } from './business/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RecoverpasswordComponent } from './business/recoverpassword/recoverpassword.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'recoverpassword',
    component: RecoverpasswordComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'layout',
    loadComponent:  () => import('./shared/layout/layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./business/dashboard/dashboard.component'),
        canActivate: [authGuard]
      },
      {
        path: 'inicio',
        loadComponent: () => import('./business/inicio/inicio.component'),
        canActivate: [authGuard]
      },
      {
        path: 'administrador',
        loadComponent: () => import('./business/administrador/administrador.component'),
        canActivate: [authGuard]
      },
      {
        path: 'cargadearchivos',
        loadComponent: () => import('./business/cargadearchivos/cargadearchivos.component'),
        canActivate: [authGuard]
      },
      {
        path: 'mantenimiento',
        loadComponent: () => import('./business/mantenimiento/mantenimiento.component'),
        canActivate: [authGuard]
      },
      {
        path: 'cargaclientes',
        loadComponent: () => import('./business/cargaclientes/cargaclientes.component'),
        canActivate: [authGuard]
      },
      {
        path: 'turnos',
        loadComponent: () => import('./business/turnos/turnos.component'),
        canActivate: [authGuard]
      },
      {
        path: 'contratos',
        loadComponent: () => import('./business/contratos/contratos.component'),
        canActivate: [authGuard]
      },
      {
        path: 'adjudicarcontratos',
        loadComponent: () => import('./business/adjudicarcontratos/adjudicarcontratos.component'),
        canActivate: [authGuard]
      },
      {
        path: 'actualizarcontratos',
        loadComponent: () => import('./business/actualizarcontratos/actualizarcontratos.component'),
        canActivate: [authGuard]
      },
      {
        path: 'actualizarclientes',
        loadComponent: () => import('./business/actualizarclientes/actualizarclientes.component'),
        canActivate: [authGuard]
      },
      {
        path: 'procesos',
        loadComponent: () => import('./business/procesos/procesos.component'),
        canActivate: [authGuard]
      },
      {
        path: 'turnosgenerados',
        loadComponent: () => import('./business/turnosgenerados/turnosgenerados.component'),
        canActivate: [authGuard]
      },
      {
        path: 'createusergestor',
        loadComponent: () => import('./business/createusergestor/createusergestor.component'),
        canActivate: [authGuard]
      },
      {
        path: 'adminapproval',
        loadComponent: () => import('./business/adminapproval/adminapproval.component'),
        canActivate: [authGuard]
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  }
];
