import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../employee';
import { EmployeeService } from '../../../employee.service';
import { MapService } from '../../../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  waypts: google.maps.DirectionsWaypoint[] = [];
  mapLoaded: boolean;
  map: google.maps.Map;
  center: google.maps.LatLngLiteral;
  coordinates: google.maps.LatLngLiteral;
  source: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  ds: google.maps.DirectionsService;
  dr: google.maps.DirectionsRenderer;
  test;
  id: number;
  employee: Employee;
  employees: Employee[];
  loop:number=0;
  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoom: 12
  }
  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private mapService: MapService) { }

  ngOnInit() {
    this.ds = new google.maps.DirectionsService();
    this.dr = new google.maps.DirectionsRenderer({
      map: null,
      suppressMarkers: true
    });
    
    // I get the id from the URL and get the employee that I selected from the previous page
    this.id = this.route.snapshot.params['id'];
    this.employee = new Employee();
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      // I am calling the function to get coordinates for center
      this.getCoordinatesForCenter(data.address, data.city);
    });
  }

  // Getting the employees data from the backend with httpclient
  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    this.employees.length;
      for (let emp of this.employees) {
        
        // get the coordinates for each employee of the employees list
        this.getCoordinates(emp.address, emp.city,emp.id);
      }
    })
  }

  // Here we get the coorinates for the center of the screen(green pin) and call the method for the rest of pins
  getCoordinatesForCenter(address: string, city: string) {
    this.mapService.getLongAndLat(address, city).subscribe(data => {
      this.test = data;
      this.center = this.test.results[0].geometry.location;
      navigator.geolocation.getCurrentPosition(position => {

        // initialize the map container
        this.map = new google.maps.Map(document.getElementById('map-canvas'), {
          ...this.options,
          center: this.center
        });

        // adding a marker
        var markerStart = new google.maps.Marker({
          position: this.center,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            anchor: new google.maps.Point(35, 10),
            scaledSize: new google.maps.Size(50, 50)
          },
          map: this.map
        });
      });
      //call the method to bring the rest of the employees 
      this.getEmployees();
    });
  }
  
  // Here we get the coordinates,we put the destination markers pins and start the routing polyline 
  getCoordinates(address: string, city: string,id:number) {
    this.mapService.getLongAndLat(address, city).subscribe(data => {
      this.test = data;
      this.loop=this.loop+1;
      this.coordinates = this.test.results[0].geometry.location;
      // we check if the current employee is the same as the one we selected on the previous page( this.center)
      if (this.coordinates.lat != this.center.lat && this.coordinates.lng != this.center.lng) {
        this.waypts.push({
          location: address + city,
          stopover: true,
        });
        var destinationMarker = new google.maps.Marker({
          position: this.coordinates,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            anchor: new google.maps.Point(35, 10),
            scaledSize: new google.maps.Size(50, 50)
          },
          map: this.map
        });
       // Checking if it's the last employee, then checking if he has car or not and call the method for the routing accordingly
        if(this.loop==this.employees.length){
          if (this.employee.carOwned) {
            this.setRoutePolylineByDriving(address, city);
          } else {
            this.setRoutePolylineByWalking(address, city);
          }
        }
      }

    });
  }
  setRoutePolylineByDriving(address: string, city: string) {
    let request = {
      origin: this.center,
      destination: this.coordinates,
      waypoints: this.waypts,
      travelMode: google.maps.TravelMode.DRIVING
    }
    this.ds.route(request, (response, status) => {
      this.dr.setOptions({
        suppressPolylines: false,
        map: this.map
      });
      if (status == google.maps.DirectionsStatus.OK) {
        this.dr.setDirections(response);
      }
    })
  }
  setRoutePolylineByWalking(address: string, city: string) {
    let request = {
      origin: this.center,
      destination: this.coordinates,
      waypoints: this.waypts,
      travelMode: google.maps.TravelMode.WALKING
    }
    this.ds.route(request, (response, status) => {
      this.dr.setOptions({
        suppressPolylines: false,
        map: this.map
      });
      if (status == google.maps.DirectionsStatus.OK) {
        this.dr.setDirections(response);
      }
    })
  }
}






// }
