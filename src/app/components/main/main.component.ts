import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { WeatherAppService } from 'src/app/services/weatherapp.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  cityName: string = '';
  cityResults: any = [];
  active = 'active';
  date: any;

  constructor(
    public weatherAppServices: WeatherAppService,
    private apiServices: ApiService
  ) {}

  ngOnInit(): void {
    this.date = new Date();
    // this.weatherAppServices.updateWeatherData();
  }

  handleChange(event: string): void {
    this.apiServices.searchApi(event).subscribe((cityResults: any) => {
      this.cityResults = cityResults;
    });
  }
  handleCityClick(city: any) {
    this.weatherAppServices.getWeatherData(city);
    this.cityResults = [];
    this.cityName = '';
  }
}
