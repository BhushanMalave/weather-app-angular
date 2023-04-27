import { Component, OnInit } from '@angular/core';
import { WeatherAppService } from 'src/app/services/weatherapp.service';

@Component({
  selector: 'app-recentsearch',
  templateUrl: './recentsearch.component.html',
  styleUrls: ['./recentsearch.component.css'],
})
export class RecentsearchComponent implements OnInit {
  recentSearchCities: any = [];

  constructor(public weatherAppServices: WeatherAppService) {}
  ngOnInit(): void {
    this.weatherAppServices.getRecentSearchCities();
    let data: any = localStorage.getItem('recentSearchDetails');
    this.recentSearchCities = JSON.parse(data);
  }

  showWeatherDetails(cityData: any) {
    localStorage.setItem('weatherDetails', JSON.stringify(cityData));
    this.weatherAppServices.refresh();
  }
  addToFavourite(cityData: any) {
    this.weatherAppServices.addtoFavouritefromRecentSearch(cityData);
  }
  removeFromFavourite(cityData: any) {
    this.weatherAppServices.removefromfavouriteinRecentSearchList(cityData);
  }

  clearRecentSearch() {
    this.weatherAppServices.clearRecentSearchList();
  }
}
