import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './models/pagination';
import { IProduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products: IProduct[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<IPagination<IProduct []>>('https://localhost:5001/api/products?pageSize=50').subscribe({
      next: (response: any) => this.products = response.data,     // What to do next
      error: error => console.log(error),                         // What to do if there is an error
      complete: () => {
        console.log('Request completed');
        console.log('Extra statements');
      }
    });
  }
}
