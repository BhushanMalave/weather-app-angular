import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(public router: Router) {}
  ngOnInit(): void {}
  addtoFavourite(weatherData: any) {
    const data: any = localStorage.getItem('weatherDetailsList');
    weatherData = {
      favourite: true,
      recentSearch: weatherData.recentSearch,
      data: weatherData.data,
    };
    localStorage.setItem('weatherDetails', JSON.stringify(weatherData));
    const datalist = JSON.parse(data);

    datalist.map((item: any) => {
      if (item?.data?.location?.name === weatherData?.data?.location?.name) {
        item.favourite = true;
      }
    });
    localStorage.setItem('weatherDetailsList', JSON.stringify(datalist));
  }

  removefromFavourite(weatherData: any): void {
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
  }

  refresh() {
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
