import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:Car
  carImages:CarImage[]
  carPaths:Car[]

  constructor(private carService: CarService, private imageService:CarImageService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){       
        // this.getImagesByCarId(params["carId"])
        this.getCarDetails(params["carId"])
      }
    })
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response=>{
      this.carDetails=response.data[0]
      this.carPaths=response.data
    })
  }
  getImagesByCarId(carId:number){
    this.imageService.getCarImages(carId).subscribe(response=>{
      this.carImages=response.data
    })
    // getCarImagePaths(carId:number){
    //   this.carService.getCarImagePaths(carId).subscribe(response=>{
    //     this.carPaths=response.data
    //   })
  }

}
