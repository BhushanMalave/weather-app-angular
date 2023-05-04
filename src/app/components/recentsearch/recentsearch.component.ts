import { Component, OnInit } from '@angular/core';
import { RecentsearchService } from 'src/app/services/recentsearch.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-recentsearch',
  templateUrl: './recentsearch.component.html',
  styleUrls: ['./recentsearch.component.css'],
})
export class RecentsearchComponent implements OnInit {
  recentSearchCities: any = [];
  showDialogueBox: boolean = false;

  constructor(
    public router: Router,
    public recentsearchServices: RecentsearchService
  ) {}
  ngOnInit(): void {
    this.getRecentSearchCityWeatherData();
  }

  getRecentSearchCityWeatherData() {
    this.recentsearchServices.getRecentSearchCities();
    let data: any = localStorage.getItem('recentSearchDetails');
    this.recentSearchCities = JSON.parse(data);
  }
  showWeatherDetails(cityData: any) {
    localStorage.setItem('weatherDetails', JSON.stringify(cityData));
    this.router.navigate(['']);
  }
  addToFavourite(cityData: any) {
    this.recentsearchServices.addtoFavouritefromRecentSearch(cityData);
    this.getRecentSearchCityWeatherData();
  }

  removeFromFavourite(cityData: any) {
    this.recentsearchServices.removefromfavouriteinRecentSearchList(cityData);
    this.getRecentSearchCityWeatherData();
  }

  clearRecentSearch() {
    this.recentsearchServices.clearRecentSearchList();
    this.showDialogueBox = false;
    this.getRecentSearchCityWeatherData();
  }
}
