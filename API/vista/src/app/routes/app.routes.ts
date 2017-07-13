import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablaComponent } from "../components/tabla/tabla.component";
import {  FormComponent } from "../components/form/form.component";
const ROUTES: Routes = [
  { path: "tabla", component: TablaComponent },
  { path: "form", component: FormComponent },
  { path: "form/:id", component: FormComponent },
  { path: "**", pathMatch :'full' ,redirectTo :'tabla' },
];


export const APP_ROUTING = RouterModule.forRoot(ROUTES);