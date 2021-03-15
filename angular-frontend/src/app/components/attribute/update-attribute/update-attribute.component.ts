import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Attribute } from '../../../attribute';
import { AttributeService } from '../../../attribute.service';

@Component({
  selector: 'app-update-attribute',
  templateUrl: './update-attribute.component.html',
  styleUrls: ['./update-attribute.component.css']
})
export class UpdateAttributeComponent implements OnInit {
  id: number;
  attributes: Attribute[];
  attribute: Attribute= new Attribute();
  constructor(private attributeService :AttributeService,
    private route: ActivatedRoute,
    private router: Router) { }
 
  ngOnInit(): void {
    this.id= this.route.snapshot.params['id'];
    this.attributeService.getAttributeById(this.id).subscribe(data => {
      this.attribute = data;
    },
    error=> console.log(error)
    );
  
  }
  
  goToAttributeList(){
    this.router.navigate(['/attributes']);
  }  

  onSubmit(){
    this.attributeService.updateAttribute(this.id,this.attribute).subscribe(data =>{
      this.goToAttributeList();
    },
    error=> console.log(error));
  }

  form= new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)])
   })
}
