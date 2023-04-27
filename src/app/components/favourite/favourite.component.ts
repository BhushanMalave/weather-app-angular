import { Component, OnInit } from '@angular/core';
import { WeatherAppService } from 'src/app/services/weatherapp.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
})
export class FavouriteComponent implements OnInit {
  favouriteCities: any = [];
  constructor(public weatherAppServices: WeatherAppService) {}
  ngOnInit(): void {
    this.weatherAppServices.getFavouriteCities();
    let data: any = localStorage.getItem('favouriteCities');
    this.favouriteCities = JSON.parse(data);
  }
  showWeatherDetails(cityData: any) {
    localStorage.setItem('weatherDetails', JSON.stringify(cityData));
    this.weatherAppServices.refresh();
  }

  clearFavouriteCities() {
    this.weatherAppServices.clearFavouriteCityList();
  }

  removeFromFavourite(cityData: any) {
    this.weatherAppServices.removefromFavouriteList(cityData);
  }
}
