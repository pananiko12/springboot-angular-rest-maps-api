import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { AttributeListComponent } from './components/attribute/attribute-list/attribute-list.component';
import { CreateAttributeComponent } from './components/attribute/create-attribute/create-attribute.component';
import { AttributeDetailsComponent } from './components/attribute/attribute-details/attribute-details.component';
import { UpdateAttributeComponent } from './components/attribute/update-attribute/update-attribute.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GoogleMapsModule } from '@angular/google-maps'
import { MapComponent } from './components/map/map/map.component';
import { SearchEmployeeComponent } from './components/map/search-employee/search-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HomePageComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeDetailsComponent,
    AttributeListComponent,
    CreateAttributeComponent,
    AttributeDetailsComponent,
    UpdateAttributeComponent,
    MapComponent,
    SearchEmployeeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
