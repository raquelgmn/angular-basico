import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafica-barra',
  templateUrl: './grafica-barra.component.html',
  styles: [
  ]
})
export class GraficaBarraComponent implements OnInit {

  @Input() horizontal: boolean = false;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';

  @Input() barChartData: ChartData = {
    // labels: [ '2020', '2021', '2022', '2023', '2024', '2025', '2026' ],
    datasets: [
      // { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A', backgroundColor: '#FD6047' , hoverBackgroundColor: 'red'},
      // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B', backgroundColor: '#F763C4' , hoverBackgroundColor: 'red'},
      // { data: [ 18, 33, 70, 59, 66, 80, 100 ], label: 'Series C', backgroundColor: '#D665E0', hoverBackgroundColor: 'red' },
    ]
  };
  
  constructor() {

 
   }

  ngOnInit(): void {
    if (this.horizontal){
      this.barChartType = 'line';
    }
  }

}
