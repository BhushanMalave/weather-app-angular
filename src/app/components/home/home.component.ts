import { Component, OnInit } from '@angular/core';
import { WeatherAppService } from 'src/app/services/weatherapp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 temp:string="Celcius";
 cityweatherData:any=[];
constructor(
  public weatherAppServices : WeatherAppService
){

}
ngOnInit(): void {
   
     let data: any = localStorage.getItem('weatherDetails');
     this.cityweatherData = JSON.parse(data);
  }
 addToFavourite(){
  
 }
removeFromFavourite(){
  
 }
 convertToFahreneit(){
  this.temp="Fahreneit"
 }
 convertToCelcius(){
  this.temp="Celcius"
 }
}
