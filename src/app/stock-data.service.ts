import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CompanyName, CompanySearch, Sentiment, StockData } from './stocks.models';


@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor(private http: HttpClient) { }
  
  getStockData(value: string) {
    return this.http
    .get<StockData>(`https://finnhub.io/api/v1/quote?symbol=${value.toLocaleUpperCase()}&token=bu4f8kn48v6uehqi3cqg`)
    .pipe(map((response) => response));

  }
  getName(value: string) {
    return this.http.get<CompanySearch>(`https://finnhub.io/api/v1/search?q=${value}&token=bu4f8kn48v6uehqi3cqg`)
    .pipe(map((response) => response.result[0]))
  }

  getInsiderSentiment(value: string) {
    return this.http.get<Sentiment>(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${value}&from=2015-01-01&to=2022-03-01&token=bu4f8kn48v6uehqi3cqg`)
    .pipe(map((response) =>  {
      return {
        data: response.data.splice(response.data.length - 3, response.data.length),
        symbol: response.symbol
      }
    }))
  }
}
