import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  @Input() car:Car;
  rentals: Rental[] = [];
  customers:Customer[]
  customerId:number
  rentDate:Date
  returnDate:Date
  


  constructor(
    private rentalService: RentalService,
    private customerService:CustomerService,
    private toastrService:ToastrService,
    private router:Router) {}

  ngOnInit(): void {
    this.getRentals()
    this.getCustomers()
    }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }
  getCustomers(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
      //this.dataLoaded = true;
    })
  }
  getMinRentDate(){
    var today = new Date()
    today.setDate(today.getDate()+1)
    return today.toISOString().slice(0,10)
  }
  getMinReturnDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0,10)
  }
  getButtonState(rentDate:Date,returnDate:Date){ 
    if(returnDate>rentDate){
      return "btn btn-primary"
    }else{
      return "btn btn-primary disabled"
    }
  }

  createRental(){
    let MyRental:Rental = {
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      carId: this.car.id,
      customerId: parseInt(this.customerId.toString())
    }
      this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
     this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...", "Ödeme İşlemleri"); 
    
  }
}
