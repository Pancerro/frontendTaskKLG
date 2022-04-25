import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ListComponent } from './components/list/list.component';
import { AddEditListComponent } from './components/list/add-edit-list/add-edit-list.component';
import {MaterialModule} from "../material/material.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    AddEditListComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ]
})
export class HomeModule { }
