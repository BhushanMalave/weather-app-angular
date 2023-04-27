import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WeatherAppService {
  cityWeatherData?: any = {};
  cityWeatherDataList?: any = [];
  constructor(private http: HttpClient, public router: Router) {}

  ngOnInit(): void {}

  getWeather(city: string) {
    return this.http.get(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
      {
        headers: {
          'X-RapidAPI-Key':
            '2e61d5ed65msh6e1fd3b3e86180ap10576cjsn6e517a01ff1e',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      }
    );
  }

  searchApi(text: string) {
    return this.http.get(
      `https://weatherapi-com.p.rapidapi.com/search.json?q=${text}`,
      {
        headers: {
          'X-RapidAPI-Key':
            '2e61d5ed65msh6e1fd3b3e86180ap10576cjsn6e517a01ff1e',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      }
    );
  }

  getWeatherData(city: string) {
    this.getWeather(city).subscribe((weatherDetails: any) => {
      this.cityWeatherData = {
        favourite: false,
        recentSearch: true,
        data: weatherDetails,
      };
      localStorage.setItem(
        'weatherDetails',
        JSON.stringify(this.cityWeatherData)
      );
      const data: any = localStorage.getItem('weatherDetailsList');
      if (data !== null) {
        this.cityWeatherDataList = JSON.parse(data);
        const city = this.cityWeatherDataList.map(
          (value: any) => value?.data?.location?.name
        );
        if (city.includes(this.cityWeatherData?.data?.location?.name)) {
          console.log('allready exist');
          this.cityWeatherData = {
            favourite: true,
            recentSearch: true,
            data: weatherDetails,
          };
          localStorage.setItem(
            'weatherDetails',
            JSON.stringify(this.cityWeatherData)
          );
          localStorage.setItem(
            'weatherDetailsList',
            JSON.stringify(this.cityWeatherDataList)
          );
        } else {
          this.cityWeatherDataList.push(this.cityWeatherData);
          console.log('does not exist');
          localStorage.setItem(
            'weatherDetailsList',
            JSON.stringify(this.cityWeatherDataList)
          );
        }
      } else {
        this.cityWeatherDataList.push(this.cityWeatherData);
        console.log('does not exist');
        localStorage.setItem(
          'weatherDetailsList',
          JSON.stringify(this.cityWeatherDataList)
        );
      }
      this.refresh();
    });
  }

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
    this.refresh();
  }

  addtoFavouritefromRecentSearch(weatherData: any) {
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
    this.refreshRecentSearchList();
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
    this.refresh();
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
    this.refreshRecentSearchList();
  }

  getRecentSearchCities(): void {
    const data: any = localStorage.getItem('weatherDetailsList');
    const datalist = JSON.parse(data);
    const filterdatalist = datalist.filter((item: any): boolean => {
      return item.recentSearch === true;
    });
    localStorage.setItem('recentSearchDetails', JSON.stringify(filterdatalist));
  }

  getFavouriteCities(): void {
    const data: any = localStorage.getItem('weatherDetailsList');
    const datalist = JSON.parse(data);
    const filterdatalist = datalist.filter((item: any): boolean => {
      return item.favourite === true;
    });
    localStorage.setItem('favouriteCities', JSON.stringify(filterdatalist));
  }

  clearRecentSearchList(): void {
    let data: any = localStorage.getItem('weatherDetailsList');
    const datalist = JSON.parse(data);
    datalist.map((item: any) => {
      item.recentSearch = false;
    });
    localStorage.setItem('weatherDetailsList', JSON.stringify(datalist));
    this.refreshRecentSearchList();
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

  refresh() {
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
  refreshFavouriteList() {
    this.router.navigate(['favourite']).then(() => {
      window.location.reload();
    });
  }
  refreshRecentSearchList() {
    this.router.navigate(['recent']).then(() => {
      window.location.reload();
    });
  }
}
