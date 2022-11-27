import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatestWith, map } from 'rxjs/operators';
import { StockDataService } from '../stock-data.service';
import { CompanyStock } from '../stocks.models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  companyName: string = '';
  companyStockPanel: Array<CompanyStock> = [];

  constructor(
    private _stockData: StockDataService, 
    private _router: Router, 
    ) {}
  
  ngOnInit(): void {
    this.getCompanyStockInfo();
  }
  searchCompanyStockData(value: string) {
    this._stockData.getStockData(value).pipe(
      combineLatestWith(this._stockData.getName(this.companyName)),
      map(([stockData, name]) => {
        return {
          name: name,
          data: stockData
        }
      })
    ).subscribe((res) => {
      this.companyStockPanel.push(res)
      localStorage.setItem(`company-stock-info`, JSON.stringify(this.companyStockPanel))

    })
}
  deleteCompanyStockPanel(index: number) {
    let currentCompanyArr = JSON.parse(localStorage.getItem('company-stock-info') || '[]');
    currentCompanyArr.splice(index,1)
    this.companyStockPanel = currentCompanyArr;
    localStorage.setItem(`company-stock-info`, JSON.stringify(this.companyStockPanel))

  }

  goToSentiment(company: string) {
    this._router.navigate(['/sentiment', company])
  }

  getCompanyStockInfo() {
    this.companyStockPanel = JSON.parse(localStorage.getItem('company-stock-info')!) ?? [];
  }

  setToLocalStorage() {
    localStorage.setItem(`company-stock-info`, JSON.stringify(this.companyStockPanel))
  }
}
