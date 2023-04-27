import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  constructor(private http: HttpClient, public router: Router) {}

  getFavouriteCities(): void {
    const data: any = localStorage.getItem('weatherDetailsList');
    const datalist = JSON.parse(data);
    const filterdatalist = datalist.filter((item: any): boolean => {
      return item.favourite === true;
    });
    localStorage.setItem('favouriteCities', JSON.stringify(filterdatalist));
  }

  clearFavouriteCityList(): void {
    const data: any = localStorage.getItem('weatherDetailsList');
    const datalist = JSON.parse(data);
    datalist.map((item: any) => {
      item.favourite = false;
    });
    localStorage.setItem('weatherDetailsList', JSON.stringify(datalist));
    let weatherData: any = localStorage.getItem('weatherDetails');
    weatherData = JSON.parse(weatherData);
    console.log(weatherData);
    weatherData = {
      favourite: false,
      recentSearch: weatherData.recentSearch,
      data: weatherData.data,
    };
    localStorage.setItem('weatherDetails', JSON.stringify(weatherData));
    this.refreshFavouriteList();
  }

  removefromFavouriteList(weatherData: any): void {
    weatherData = {
      favourite: false,
      recentSearch: weatherData.recentSearch,
      data: weatherData.data,
    };
    localStorage.setItem('weatherDetails', JSON.stringify(weatherData));

    const data: any = localStorage.getItem('weatherDetailsList');
    const datalist = JSON.parse(data);

    datalist.map((item: any) => {
      if (item?.data?.location?.name === weatherData?.data?.location?.name) {
        item.favourite = false;
      }
    });
    localStorage.setItem('weatherDetailsList', JSON.stringify(datalist));
    this.refreshFavouriteList();
  }

  refreshFavouriteList() {
    this.router.navigate(['favourite']).then(() => {
      window.location.reload();
    });
  }
}
