import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookFormPageComponent } from './book-form-page/book-form-page.component';
import { BookDashboardComponent } from './book-dashboard/book-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: BookDashboardComponent },
  { path: 'create', component: BookFormPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
