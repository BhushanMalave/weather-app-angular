import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  temp: string = 'Celcius';
  cityweatherData: any = [];
  constructor(public homeServices: HomeService) {}
  ngOnInit(): void {
    let data: any = localStorage.getItem('weatherDetails');
    this.cityweatherData = JSON.parse(data);
  }
  addToFavourite(cityweatherData: any) {
    this.homeServices.addtoFavourite(cityweatherData);
  }
  removeFromFavourite(cityweatherData: any) {
    this.homeServices.removefromFavourite(cityweatherData);
    // localStorage.clear();
  }
  convertToFahreneit() {
    this.temp = 'Fahreneit';
  }
  convertToCelcius() {
    this.temp = 'Celcius';
  }
}
