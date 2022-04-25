import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {ListComponent} from "./components/list/list.component";
import {AddEditListComponent} from "./components/list/add-edit-list/add-edit-list.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'list/details/:id',
        component: AddEditListComponent,
        data: {
          title: {
            edit: 'Edit Element',
            create: 'Add Element',
            view: 'View Element'
          }
        }
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
