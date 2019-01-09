import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {
  baseApiPath = "https://api.themoviedb.org/3"

  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatesMoovies (page = 1){ 
    return this.http.get(this.baseApiPath + `/movie/popular?/page=${page}&api_key=e95120cf4c7f5c0d2f6fb49080b356fc`);
  }

  getMooviesDetails(filmeId){ 
    return this.http.get(this.baseApiPath + `/movie/${filmeId}?api_key=e95120cf4c7f5c0d2f6fb49080b356fc`);
  }
}
