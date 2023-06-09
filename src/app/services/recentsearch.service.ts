import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecentsearchService {
  getRecentSearchCities(): void {
    const data: any = localStorage.getItem('weatherDetailsList');
    const datalist = JSON.parse(data);
    const filterdatalist = datalist.filter((item: any): boolean => {
      return item.recentSearch === true;
    });
    localStorage.setItem('recentSearchDetails', JSON.stringify(filterdatalist));
  }

  addtoFavouritefromRecentSearch(weatherData: any) {
    weatherData = {
      favourite: true,
      recentSearch: weatherData.recentSearch,
      data: weatherData.data,
    };
    localStorage.setItem('weatherDetails', JSON.stringify(weatherData));

    const data: any = localStorage.getItem('weatherDetailsList');
    const datalist = JSON.parse(data);
    datalist.map((item: any) => {
      if (item?.data?.location?.name === weatherData?.data?.location?.name) {
        item.favourite = true;
      }
    });

    localStorage.setItem('weatherDetailsList', JSON.stringify(datalist));
  }

  removefromfavouriteinRecentSearchList(weatherData: any): void {
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

  clearRecentSearchList(): void {
    let data: any = localStorage.getItem('weatherDetailsList');
    const datalist = JSON.parse(data);
    datalist.map((item: any) => {
      item.recentSearch = false;
    });
    localStorage.setItem('weatherDetailsList', JSON.stringify(datalist));
  }
}
