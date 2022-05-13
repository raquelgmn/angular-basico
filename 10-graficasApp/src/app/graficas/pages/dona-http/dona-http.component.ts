import { Component, OnInit } from '@angular/core';
import { Color, ChartData, ChartType } from 'chart.js';
import { GraficasService } from '../../services/graficas.service';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [
  ]
})
export class DonaHttpComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: string[] = [
    //'Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Others'
  ];

  public colors: Color[] = ['#0C98F6', '#01EBCC', '#0BD480', '#0BB8D4', '#0CF653'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
       { data: [], backgroundColor: this.colors },
      // { data: [ 50, 150, 120 ] },
      // { data: [ 250, 130, 70 ] }
    ]

  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private graficaService: GraficasService) { }

  ngOnInit(): void {

    // this.graficaService.getUsuariosRedesSociales()
    //   .subscribe( data => {
    //     console.log(data);
    //     const labels = Object.keys( data );
    //     const values = Object.values( data );

    //     console.log(values);
    //     this.doughnutChartData.labels = labels;
    //     this.doughnutChartData.datasets[0].data = values;
    //     console.log(JSON.stringify(this.doughnutChartData))
    //     //this.doughnutChartData.datasets = values;
    //   })

    this.graficaService.getUsuariosRedesSocialesDonaData()
      .subscribe( ({ labels, values }) =>{

        console.log(labels);
        console.log(values);
        this.doughnutChartData.labels = labels;
        this.doughnutChartData.datasets[0].data = values;
        console.log(JSON.stringify(this.doughnutChartData))
      })
  }

}
