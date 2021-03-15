import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../../employee';
import { EmployeeService } from '../../../employee.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Attribute } from '../../../attribute';
import { AttributeService } from '../../../attribute.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  attributes: Attribute[];
  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService,
    private attributeService: AttributeService,
    private router: Router) { }
  dropdownList = [];


  dropdownSettings: IDropdownSettings;

  private getAttributes() {
    this.attributeService.getAttributesList().subscribe(data => {
      this.attributes = data;
      this.dropdownList = data;
    })
  }
  ngOnInit() {
    this.getAttributes();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'attrId',
      textField: 'attrName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
  }


  // when we click submit we come here and we call saveEmployee method
  onSubmit() {
    this.saveEmployee();
  }
  // uses employeeService to create employee and navigates to employees list if it's successfull
  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(data => {
      this.goToEmployeeList();
    },
      error => console.log(error));
  }


  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  // Form Validation
  myGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  })


}
