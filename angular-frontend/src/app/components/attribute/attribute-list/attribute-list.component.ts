import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attribute } from '../../../attribute';
import { AttributeService } from '../../../attribute.service';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.css']
})
export class AttributeListComponent implements OnInit {

  attributes: Attribute[];

  constructor(private attributeService: AttributeService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAttributes();
  }
  updateAttribute(id: number){
      this.router.navigate(['update-attribute',id]);
  }
  attributeDetails(id:number){
    this.router.navigate(['attribute-details',id]);
  }
deleteAttribute(id:number){
  this.attributeService.deleteAttribute(id).subscribe( data => {
    this.getAttributes();
  });
}
  private getAttributes(){
    this.attributeService.getAttributesList().subscribe(data => {
      this.attributes = data;
    })
  }
}
