import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Attribute } from '../../../attribute';
import { AttributeService } from '../../../attribute.service';
import { Employee } from '../../../employee';
import { EmployeeService } from '../../../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee= new Employee();
  constructor(private employeeService :EmployeeService,
    private attributeService :AttributeService,
    private route: ActivatedRoute,
    private router: Router) { }
    dropdownList = [];
    attributes: Attribute[];
    dropdownSettings :IDropdownSettings;
    private getAttributes(){
      this.attributeService.getAttributesList().subscribe(data => {
        this.attributes = data;
        this.dropdownList = data;
      })
    }
  ngOnInit(): void {
    this.id= this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    },
    error=> console.log(error));
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
  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }  
  employeeDetails(id:number){
    this.router.navigate(['employee-details',id]);
  }

  onSubmit(){
    this.employeeService.updateEmployee(this.id,this.employee).subscribe(data =>{
      this.employeeDetails(this.id);
    },
    error=> console.log(error));
  }
  // Validation
  myGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  })

}
