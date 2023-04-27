import { Component, OnInit } from '@angular/core';
import { WeatherAppService } from 'src/app/services/weatherapp.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  cityName: string = 'Udupi';
  cityResults: any = [];
  active = 'active';
  date: any;

  constructor(public weatherAppServices: WeatherAppService) {}

  ngOnInit(): void {
    this.date = new Date();
  }

  handleChange(event: string): void {
    this.weatherAppServices.searchApi(event).subscribe((cityResults: any) => {
      this.cityResults = cityResults;
    });
  }
  handleCityClick(city: any) {
    this.weatherAppServices.getWeatherData(city);
    this.cityResults = [];
  }
}
