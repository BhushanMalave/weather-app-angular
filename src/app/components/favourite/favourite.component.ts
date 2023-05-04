import { Component, OnInit } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
})
export class FavouriteComponent implements OnInit {
  favouriteCities: any = [];
  showDialogueBox: boolean = false;

  constructor(
    public router: Router,
    public favouriteServices: FavouriteService
  ) {}
  ngOnInit(): void {
    this.getFavouriteCityWeatherData();
  }

  getFavouriteCityWeatherData() {
    this.favouriteServices.getFavouriteCities();
    let data: any = localStorage.getItem('favouriteCities');
    this.favouriteCities = JSON.parse(data);
  }
  showWeatherDetails(cityData: any) {
    localStorage.setItem('weatherDetails', JSON.stringify(cityData));
    this.router.navigate(['']);
  }

  clearFavouriteCities() {
    this.favouriteServices.clearFavouriteCityList();
    this.showDialogueBox = false;
    this.getFavouriteCityWeatherData();
  }

  removeFromFavourite(cityData: any) {
    this.favouriteServices.removefromFavouriteList(cityData);
    this.getFavouriteCityWeatherData();
  }
}
