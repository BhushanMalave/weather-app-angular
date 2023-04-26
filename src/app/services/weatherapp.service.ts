import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WeatherAppService {
  cityWeatherData:any={};
  favouriteCity:any=[];
  constructor(
    private http: HttpClient,
    public router: Router) {}

  getWeather(city: string) {
    return this.http.get(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,{
      headers: {
        'X-RapidAPI-Key': '2e61d5ed65msh6e1fd3b3e86180ap10576cjsn6e517a01ff1e',
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

  getWeatherData(city:string){
      this.getWeather(city).subscribe((weatherDetails: any) => {
        this.cityWeatherData={favourite:false,data:weatherDetails};
     localStorage.setItem('weatherDetails',JSON.stringify(this.cityWeatherData));
       this.refresh();
    });
  }

  refresh() {
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
}
}