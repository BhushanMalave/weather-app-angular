import { Component, OnInit } from '@angular/core';
import { WeatherAppService } from 'src/app/services/weatherapp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  temp: string = 'Celcius';
  cityweatherData: any = [];
  constructor(public weatherAppServices: WeatherAppService) {}
  ngOnInit(): void {
    let data: any = localStorage.getItem('weatherDetails');
    this.cityweatherData = JSON.parse(data);
  }
  addToFavourite(cityweatherData: any) {
    this.weatherAppServices.addtoFavourite(cityweatherData);
  }
  removeFromFavourite(cityweatherData: any) {
    this.weatherAppServices.removefromFavourite(cityweatherData);
    // localStorage.clear();
  }
  convertToFahreneit() {
    this.temp = 'Fahreneit';
  }
  convertToCelcius() {
    this.temp = 'Celcius';
  }
}
