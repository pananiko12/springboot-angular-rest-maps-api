import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributeDetailsComponent } from './components/attribute/attribute-details/attribute-details.component';
import { AttributeListComponent } from './components/attribute/attribute-list/attribute-list.component';
import { CreateAttributeComponent } from './components/attribute/create-attribute/create-attribute.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MapComponent } from './components/map/map/map.component';
import { SearchEmployeeComponent } from './components/map/search-employee/search-employee.component';
import { UpdateAttributeComponent } from './components/attribute/update-attribute/update-attribute.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';

const routes: Routes = [
  {path: 'employees', component: EmployeeListComponent},
  {path: 'map/:id', component: MapComponent},
  {path: 'attributes', component: AttributeListComponent},
  {path: 'search-employee', component: SearchEmployeeComponent},
  {path: 'create-employee', component: CreateEmployeeComponent},
  {path: 'create-attribute', component: CreateAttributeComponent},
  {path: 'update-employee/:id', component: UpdateEmployeeComponent},
  {path: 'update-attribute/:id', component: UpdateAttributeComponent},
  {path: 'employee-details/:id', component: EmployeeDetailsComponent},
  {path: 'attribute-details/:id', component: AttributeDetailsComponent},
  {path: 'home', component: HomePageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
