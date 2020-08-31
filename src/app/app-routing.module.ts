import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';

import { AuthComponent } from './modules/auth/auth.component';
import { PanelComponent } from './modules/panel/panel.component';
import { ListDragonComponent } from './modules/panel/dragon/list/listDragon.component';
import { CreateDragonComponent } from './modules/panel/dragon/create/createDragon.component';


const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: '', component: PanelComponent,
    children: [
      { path: '', component: ListDragonComponent, canActivate: [AuthGuard]},
      { path: 'create', component: CreateDragonComponent, canActivate: [AuthGuard] },
      { path: 'update/:id', component: CreateDragonComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
