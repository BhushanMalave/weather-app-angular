import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
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
}
