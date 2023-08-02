import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenWatherApiService } from 'src/app/services/open-wather-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public formSearch: FormGroup;
  public data: any = null;
  public weatherImg: string = "https://openweathermap.org/img/wn/03d@4x.png";

  constructor(
    private service: OpenWatherApiService,
    private formBuilder: FormBuilder,
  ) {
    this.formSearch = this.formBuilder.group({
      city: ["", Validators.required]
    });
  }
  
  public ngOnInit(): void {
    this.updatedData("São Paulo");
  }
  
  public searchData(): void {
    if(this.formSearch.valid) {
      const { city } = this.formSearch.value;
      this.updatedData(city);
    }
    else {
      window.alert("Preencha o campo de busca.");
    }
  }

  private updatedData(city: string): void {
    this.data = null
    this.service.getDataByCity(city).subscribe({
      next: data => {
        this.data = data;
        this.weatherImg = `https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`;
      },
      error: () => {
        window.alert("A cidade não existe. Tente novamente.");
        this.updatedData("São Paulo");
      }
    });
  }
}
