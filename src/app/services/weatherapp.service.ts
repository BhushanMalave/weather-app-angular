import { Injectable } from '@angular/core';
import { HomeService } from './home.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherAppService {
  cityWeatherData?: any = {};
  cityWeatherDataList?: any = [];
  allreadyExistasFavourite: boolean = false;

  constructor(
    private apiServices: ApiService,
    public homeServices: HomeService
  ) {}

  ngOnInit(): void {}

  getWeatherData(city: string) {
    this.apiServices.getWeather(city).subscribe((weatherDetails: any) => {
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
          console.log('before', this.cityWeatherDataList);
          this.cityWeatherDataList.map((item: any) => {
            if (item?.data?.location?.name === weatherDetails?.location?.name) {
              this.allreadyExistasFavourite = item?.favourite;
              item.recentSearch = true;
            }
          });
          console.log('after', this.cityWeatherDataList);
          this.cityWeatherData = {
            favourite: this.allreadyExistasFavourite,
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
