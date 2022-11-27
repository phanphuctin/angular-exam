import { Component, OnInit } from '@angular/core';
import { combineLatestWith, map } from 'rxjs/operators';
import { StockDataService } from './stock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    console.log('OnInit');
    
  }
  title = 'angular-exam';

}
