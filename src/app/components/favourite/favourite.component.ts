import { Component } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {
 fav:string="not empty";
 favlist:number[]=[1,2,3,4,5,8,9,7,76,0]
}
