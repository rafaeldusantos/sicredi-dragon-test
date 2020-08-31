import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard'

import { AuthComponent } from './modules/auth/auth.component'
import { PanelComponent } from './modules/panel/panel.component'
import { ListComponent } from './modules/panel/dragon/list/list.component';
import { CreateComponent } from './modules/panel/dragon/create/create.component';


const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: '', component: PanelComponent,
    children: [
      { path: '', component: ListComponent, canActivate: [AuthGuard]},
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
      { path: 'update/:id', component: CreateComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
