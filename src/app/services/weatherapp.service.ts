import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherAppService {
  cityWeatherData?: any = {};
  cityWeatherDataList?: any = [];
  constructor(
    private http: HttpClient,
    public router: Router,
    public homeServices: HomeService
  ) {}

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
      this.homeServices.refresh();
    });
  }
}
