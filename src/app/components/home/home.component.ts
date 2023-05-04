import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { WeatherAppService } from 'src/app/services/weatherapp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  temperature: string = 'Celcius';
  cityweatherData: any = [];
  constructor(
    public weatherAppServices: WeatherAppService,
    public homeServices: HomeService
  ) {}

  ngOnInit(): void {
    this.getCityWeatherData();
  }

  getCityWeatherData() {
    let data: any = localStorage.getItem('weatherDetails');
    if (data === null) {
      this.weatherAppServices.getWeatherData('Udupi');
      data = localStorage.getItem('weatherDetails');
    }
    this.cityweatherData = JSON.parse(data);
  }

  addToFavourite(cityweatherData: any) {
    this.homeServices.addtoFavourite(cityweatherData);
    this.getCityWeatherData();
  }
  removeFromFavourite(cityweatherData: any) {
    this.homeServices.removefromFavourite(cityweatherData);
    this.getCityWeatherData();
  }
  convertToFahreneit() {
    this.temperature = 'Fahreneit';
  }
  convertToCelcius() {
    this.temperature = 'Celcius';
  }
}
