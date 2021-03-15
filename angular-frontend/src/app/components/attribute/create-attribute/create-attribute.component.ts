import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Attribute } from '../../../attribute';
import { AttributeService } from '../../../attribute.service';

@Component({
  selector: 'app-create-attribute',
  templateUrl: './create-attribute.component.html',
  styleUrls: ['./create-attribute.component.css']
})
export class CreateAttributeComponent implements OnInit {

  attribute: Attribute = new Attribute();
  constructor(private attributeService: AttributeService,
    private router: Router) { }
  
  ngOnInit(): void {
 

  }

saveAttribute(){
  this.attributeService.createAttribute(this.attribute).subscribe(data => {

    this.goToAttributeList();
  },
  error=> console.log(error));
}

  goToAttributeList(){
    this.router.navigate(['/attributes']);
  }  

  onSubmit() {
    this.saveAttribute();
  }
  // form validation
 form= new FormGroup({
  name: new FormControl('',[Validators.required,Validators.minLength(3)])
 
 })
}
