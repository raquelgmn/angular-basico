import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

    // Doughnut
    public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Others' ];

    public colors: Color[] = [ '#0C98F6', '#01EBCC', '#0BD480', '#0BB8D4', '#0CF653'];
    public doughnutChartData: ChartData<'doughnut'> = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [ 350, 450, 100, 150 ], backgroundColor: this.colors},
        // { data: [ 50, 150, 120 ] },
        // { data: [ 250, 130, 70 ] }
      ]
    
    };
    public doughnutChartType: ChartType = 'doughnut';




}
