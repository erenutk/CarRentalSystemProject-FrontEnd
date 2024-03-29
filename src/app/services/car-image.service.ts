import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  
  apiUrl:"https://localhost:44376/api"

  constructor(private httpClient:HttpClient) { }

  getCarImages(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"carimages/getallbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
    
}
