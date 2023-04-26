import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { RecentsearchComponent } from './components/recentsearch/recentsearch.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
   { path: '', component: HomeComponent },
    { path: 'favourite', component: FavouriteComponent },
     { path: 'recent', component: RecentsearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
