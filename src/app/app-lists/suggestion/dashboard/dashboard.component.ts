import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Barchart 1
  public barChartLegend: any;
  public barChartPlugins: any;
  public barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions!: ChartConfiguration<'bar'>['options'];
  public barChartColors: any;
  
  // Piechart 1
  public pieChartOptions1!: ChartOptions<'pie'>;
  public pieChartLabels1: any;
  public pieChartDatasets1: any;
  public pieChartLegend1 = true;
  public pieChartPlugins1 = [];

  // Piechart 1
  public pieChartOptions2!: ChartOptions<'pie'>;
  public pieChartLabels2: any;
  public pieChartDatasets2: any;
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];

  // Piechart 1
  public pieChartOptions3!: ChartOptions<'pie'>;
  public pieChartLabels3: any;
  public pieChartDatasets3: any;
  public pieChartLegend3 = true;
  public pieChartPlugins3 = [];

  
  constructor() { }
  

  ngOnInit() {
    this.loadBarChart1();
    this.loadPieChart1();
    this.loadPieChart2();
    this.loadPieChart3();
  }

  loadBarChart1() {
    console.log('bar chart')
    this.barChartLegend = true;
    this.barChartPlugins = [];
    this.barChartData= {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [ 
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A', backgroundColor: '#FF4069'},
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', backgroundColor: '#069BFF' },
      ],
    
    };

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      // scales: {
      //   x: {  ticks: {
      //     maxRotation: 70,
      //     minRotation: 70,
      //  }},
      //   y: {
      //     max: 20,
      //     min: -20, 
      //   }
      // },
      plugins: {
        title: {
          display: true,
          text: 'Bar Chart',
          position: 'bottom'
      },
        // legend: {
        //   display: true,
        //   position: 'bottom',
        // },
        // datalabels: {
        //   anchor: 'end',
        //   align: 'end'
        // }
      }
    };
  }

  loadPieChart1() {
    this.pieChartLegend1 = true;
    this.pieChartOptions1 = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Pie Chart',
          position: 'bottom'
        }
      }
    };
    this.pieChartLabels1 = ['Download', 'Store', 'Sales' ];
    this.pieChartDatasets1 = [
      {
        data: [300, 500, 100],
        label: 'My First Dataset',
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }];
    
    this.pieChartPlugins1 = [];
  }

  loadPieChart2() {
    this.pieChartLegend2 = true;
    this.pieChartOptions2 = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Pie Chart',
          position: 'bottom'
        }
      }
    };
    this.pieChartLabels2 = [ 'Download', 'Store', 'Sales' ];
    this.pieChartDatasets2 = [ {
      data: [300, 500, 100],
      label: 'My First Dataset',
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    } ];
    
    this.pieChartPlugins2 = [];
  }

  loadPieChart3() {
    this.pieChartLegend3 = true;
    this.pieChartOptions3 = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Pie Chart',
          position: 'bottom'
        }
      }
    };
    this.pieChartLabels3 = [ 'Download', 'Store', 'Sales' ];
    this.pieChartDatasets3 = [ {
      data: [300, 500, 100],
      label: 'My First Dataset',
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    } ];
    
    this.pieChartPlugins3 = [];
  }
  

  /**
   * https://www.chartjs.org/docs/latest/configuration/title.html
   * https://www.chartjs.org/docs/latest/charts/bar.html
   * https://www.chartjs.org/docs/latest/general/options.html
   * https://github.com/valor-software/ng2-charts
   * https://github.com/chartjs/awesome#integrations
   * https://www.chartjs.org/docs/latest/charts/doughnut.html#pie
   * https://www.npmjs.com/package/chart.js
   */
}
