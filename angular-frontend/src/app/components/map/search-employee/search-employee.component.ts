import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Attribute } from '../../../attribute';
import { AttributeService } from '../../../attribute.service';
import { Employee } from '../../../employee';
import { EmployeeService } from '../../../employee.service';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {

  attributes: Attribute[];
  employee: Employee = new Employee();
  selectedEmployee: Employee;
  employees: Employee[];
  selectedItems: any = [];
  showedItems: Employee[] = [];
  constructor(private employeeService: EmployeeService,
    private attributeService: AttributeService,
    private router: Router) { }
  dropdownList = [];
  dropdownSettings: IDropdownSettings;
  lastClicked: number;

  ngOnInit() {
    this.getAttributes();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'attrId',
      textField: 'attrName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }

  // getting the attributes and putting them in the selected 
  private getAttributes() {
    this.attributeService.getAttributesList().subscribe(data => {
      this.attributes = data;
      this.dropdownList = data;
    })
  }

  // getting the employees and checking every employee if he has any of the selected attributes
  // and then push him to the showeditems that go to the table
  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
      this.showedItems.length = 0;
      for (let emp of this.employees) {
        for (let selectedItem of this.selectedItems) {
          for (let attr of emp.attributes) {
            if (attr.attrId == selectedItem.attrId) {
              if (this.showedItems.indexOf(emp) == -1) {
                this.showedItems.push(emp);
              }
            }
          }
        }
      }
    })
  }

  // everytime there is a selection we have to test the employees again
  onItemSelect(item: any) {
    this.getEmployees();
  }

  onItemDeSelect(item: any) {
    this.getEmployees();
  }

  // we put background color on click when you select an employee, we save the id of the selected employee on lastClicked
  // and change the background of the last clicked employee if he exists back to white.  
  selectEmployee(item: any,) {
    if (this.lastClicked) {
      document.getElementById('tableRow' + this.lastClicked).style.backgroundColor = "white";
    }
    document.getElementById('tableRow' + item.id).style.backgroundColor = "yellow";
    this.lastClicked = item.id;
    this.selectedEmployee = item;
  }
  // we navigate to the map component
  goToMapping(id: number) {
    this.router.navigate(['map', id]);
  }

  onSelectAll(items: any) {
    this.getEmployees();
  }
  onDeSelectAll(items: any) {
    this.getEmployees();
  }
}
