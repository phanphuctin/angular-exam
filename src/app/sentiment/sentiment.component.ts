import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockDataService } from '../stock-data.service';
import { Sentiment, SentimentStockData } from '../stocks.models';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit {
  company: string = '';
  stockData: SentimentStockData[] = [];

  constructor(private _location: Location, private route: ActivatedRoute, private insiderData: StockDataService) { }

  ngOnInit(): void {
    this.getURLParam();
    this.getSentimentData();
  }

  goBack() {
    this._location.back();
  }

  getURLParam() {
    this.company = this.route?.snapshot?.paramMap?.get('symbol') || '';
  }

  getSentimentData() {
    this.insiderData.getInsiderSentiment(this.company).subscribe((data: Sentiment) => {
      console.log(' this.stockData', this.stockData);
      this.stockData = data.data;
      this.company = data.symbol;
    });
  }
}
