import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  images:CarImage[]
  currentCarId:number
  filterText=""
  carFilterText:string
  
  dataLoaded = false;
  imageBasePath = environment.baseUrl
  constructor(private carService: CarService, private imageService:CarImageService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{  
      if(params["brandId"] && params["colorId"] ){
        this.getCarsByBrandAndColor(params["brandId"],params["colorId"])
      }else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else{
        this.getCars()
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }
  getCarImages(carId: number) {
    this.imageService.getCarImages(carId).subscribe((response) => {
      this.images = response.data;
    });
  }
  getCarsByBrandAndColor(brandId:number,colorId:number){
    this.carService.getCarsByBrandAndColor(brandId,colorId).subscribe((response)=>{
      this.cars=response.data
      this.dataLoaded=true;
      // if(this.cars.length == 0){
      //   this.toastr.info('Arama sonuçunuza ait bir araç bulunmamaktadır.', 'Arama Sonucu');
      // }
    })
  }


  setCurrentCar(carId:number){
    this.currentCarId=carId
  }
  setCarFilter(filter:string){
    this.carFilterText=filter
  }
  clearCarFilter(){
    this.filterText=""
  }

  getCurrentBrandClass(carId:number){
    if(this.currentCarId!=carId){
      return "{{imageBasePath}}/Images/{{car.imagePath}}"
    }else{
      return null
    }
  }
  getSource(car:Car){
    if(car.imagePath){
      return "{{ imageBasePath }}/Images/{{ car.imagePath }}"
    }else{
      return "{{ imageBasePath }}/Images/default.png"
    }
  }
}
