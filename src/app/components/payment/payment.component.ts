import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental:Rental
  carDetail:Car
  amountOfPayment:number=0


  constructor(
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private rentalService:RentalService,
    private router:Router,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental=JSON.parse(params["rental"])
        this.getRental()
        this.getCarDetail()
      }
    })
  }
  getRental(){
    console.log(this.rental)
  }
  getCarDetail(){
    this.carService.getCarDetails(this.rental.carId).subscribe(response=>{
      this.carDetail=response.data[0]
      this.paymentCalculator()
    })
  }
  paymentCalculator(){
     if(this.rental.returnDate !=null){
      var rentDate= new Date(this.rental.rentDate.toString())
      var returnDate = new Date(this.rental.returnDate.toString())
      var difference = returnDate.getTime()-rentDate.getTime()

      var numberOfDays= (difference/(1000*3600*24))

      this.amountOfPayment= Math.ceil(numberOfDays * this.carDetail.dailyPrice)
     }
  }
  pay(){
    this.rentalService.addRentals(this.rental).subscribe(response=>{
      this.router.navigate(["/cars"])
      this.toastrService.success("Ödeme Tamamlandı","İşlem Başarılı")
    })
  }
  
}
