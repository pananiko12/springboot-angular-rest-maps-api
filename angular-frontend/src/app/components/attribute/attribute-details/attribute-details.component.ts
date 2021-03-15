import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from '../../../attribute';
import { AttributeService } from '../../../attribute.service';

@Component({
  selector: 'app-attribute-details',
  templateUrl: './attribute-details.component.html',
  styleUrls: ['./attribute-details.component.css']
})
export class AttributeDetailsComponent implements OnInit {

  id: number;
  attribute: Attribute;
  constructor(private route: ActivatedRoute,
    private attributeService: AttributeService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.attribute = new Attribute();
    this.attributeService.getAttributeById(this.id).subscribe(data => {
      this.attribute = data;
    });
  }



  goToAttributeList() {
    this.router.navigate(['/attributes']);
  }
  deleteAttribute(id: number) {
    this.attributeService.deleteAttribute(id).subscribe(data => {
      this.goToAttributeList();
    });
  }
  updateAttribute(id: number) {
    this.router.navigate(['update-attribute', id]);
  }
}
