import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})

export class StocksComponent implements OnInit, AfterViewInit {
	displayedColumns: string[];
	stockData: MatTableDataSource<Stock>;
	@ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
  	this.displayedColumns = ['name', 'symbol', 'price', 'actions'];
    let data = [
      {'name': 'NVIDIA Corporation', 'symbol': 'NVDA', 'price': 500.00},
    	{'name': 'Advanced Micro Devices', 'symbol': 'AMD', 'price': 100.00},
      {'name': 'Intel Corporation', 'symbol': 'INTC', 'price': 50.00},
		];
		this.stockData = new MatTableDataSource<Stock>(data);
	}

	ngAfterViewInit(): void {
		this.stockData.sort = this.sort;
	}
}

export interface Stock {
		name: string;
		symbol: string;
		price: number;
}
