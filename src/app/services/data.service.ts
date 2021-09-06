import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public http: HttpClient
  ) { }

  initPersonData(){

    this.http.get("./assets/persons.json").subscribe(res=>console.log(res))
  }
}
