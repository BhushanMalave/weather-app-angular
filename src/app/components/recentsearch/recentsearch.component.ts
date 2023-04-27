import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { RecentsearchService } from 'src/app/services/recentsearch.service';
import { WeatherAppService } from 'src/app/services/weatherapp.service';

@Component({
  selector: 'app-recentsearch',
  templateUrl: './recentsearch.component.html',
  styleUrls: ['./recentsearch.component.css'],
})
export class RecentsearchComponent implements OnInit {
  recentSearchCities: any = [];

  constructor(
    public weatherAppServices: WeatherAppService,
    public homeServices: HomeService,
    public recentsearchServices: RecentsearchService
  ) {}
  ngOnInit(): void {
    this.recentsearchServices.getRecentSearchCities();
    let data: any = localStorage.getItem('recentSearchDetails');
    this.recentSearchCities = JSON.parse(data);
  }

  showWeatherDetails(cityData: any) {
    localStorage.setItem('weatherDetails', JSON.stringify(cityData));
    this.homeServices.refresh();
  }
  addToFavourite(cityData: any) {
    this.recentsearchServices.addtoFavouritefromRecentSearch(cityData);
  }
  removeFromFavourite(cityData: any) {
    this.recentsearchServices.removefromfavouriteinRecentSearchList(cityData);
  }

  clearRecentSearch() {
    this.recentsearchServices.clearRecentSearchList();
  }
}
