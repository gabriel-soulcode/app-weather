import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const openWatherApiKey = "8d652e207f807eefc8276edc75f763a7";
// const baseUrlFlagApi = "https://flagsapi.com/BR/flat/64.png";

@Injectable({
  providedIn: 'root'
})
export class OpenWatherApiService {

  constructor(private http: HttpClient) { }

  public getDataByCity(city: string): Observable<any> {
    const urlOpenWatherApi: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWatherApiKey}&lang=pt_br"`;
    return this.http.get(urlOpenWatherApi);
  }
}
