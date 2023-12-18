import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import moment from 'moment';
import { SuggestionService } from 'src/app/services/suggestion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  maxDate: Date = new Date();
  showLoader: boolean = false;
  filterValue: any;
  startDate: any;
  endDate: any;
  appliedFilterValue: string = '1 Month';
  fromDate: string = '';
  toDate: string = '';
  
  // Barchart 1
  public barChartLegend1: any;
  public barChartPlugins1: any;
  public barChartData1!: ChartConfiguration<'bar'>['data'];
  public barChartOptions1!: ChartConfiguration<'bar'>['options'];
  public barChartColors1: any;

  // Barchart 2
  public barChartLegend2: any;
  public barChartPlugins2: any;
  public barChartData2!: ChartConfiguration<'bar'>['data'];
  public barChartOptions2!: ChartConfiguration<'bar'>['options'];
  public barChartColors2: any;
  
  // Piechart 1
  public pieChartOptions1!: ChartOptions<'pie'>;
  public pieChartLabels1: any;
  public pieChartDatasets1: any;
  public pieChartLegend1 = true;
  public pieChartPlugins1 = [];

  // Piechart 2
  public pieChartOptions2!: ChartOptions<'pie'>;
  public pieChartLabels2: any;
  public pieChartDatasets2: any;
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];
  
  constructor(private suggestionService: SuggestionService,
    private snackBar: MatSnackBar) { }
  

  ngOnInit() {
    this.filterValue = '1';
    this.fromDate = moment(moment(new Date()).add(-1, 'months'), 'DD-MM-YYYY').format('YYYY-MM-DD');
    this.toDate = moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');
    this.getChartValues(this.filterValue);
  }

  filterChart(type: string){
    this.filterValue = type;
    this.startDate = '';
    this.endDate = '';
    this.appliedFilterValue = type == '12' ? '1 Year' : type == '6' ? '6 Month' : '1 Month';
    const dateFilterMonth = type == '12' ? 12 : type == '6' ? 6 : 1;
    this.fromDate = moment(moment(new Date()).add(-dateFilterMonth, 'months'), 'DD-MM-YYYY').format('YYYY-MM-DD');
    this.toDate = moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');
    this.getChartValues(this.filterValue);
  }

  dateChangeStart(event: any) {
    this.startDate = moment(event?.value, 'DD-MM-YYYY').format('YYYY-MM-DD');
  }

  dateChangeEnd(event: any) {
    this.filterValue = '';
    this.endDate = moment(event?.value, 'DD-MM-YYYY').format('YYYY-MM-DD');
    this.appliedFilterValue = `From: ${this.startDate} - To: ${this.endDate}`;
    this.getChartValues(this.filterValue, this.startDate, this.endDate);
  }

  getChartValues(filterValue?: string, startDate?: string, endDate?: string) {
    this.showLoader = true;
    this.loadDepartmentChart();
    this.loadLineChart();
    this.loadCategoryChart();
    this.loadSuggestionChart();
    setTimeout(() => {
      this.showLoader = false;
      this.openToaster('Charts loaded successfully!', 3000, false);
    }, 2000);
  }

  loadDepartmentChart() {
    let payload = {
      FromDate: this.filterValue != '' ? this.fromDate : this.startDate,
      ToDate: this.filterValue != '' ? this.toDate : this.endDate
    };
    let chartData: any;
    this.suggestionService.getDepartmentChart(payload).subscribe(res => {
      chartData = res?.result;
      this.barChartLegend1 = true;
      this.barChartPlugins1 = [DataLabelsPlugin];
      this.barChartData1 = {
        labels: chartData?.labels,
        datasets: chartData?.values,
      
      };

      // this.barChartData2 = {
      //   labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      //   datasets: [
      //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor: '#FF4069' },
      //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', backgroundColor: '#069BFF' },
      //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor: '#GG4069' },
      //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', backgroundColor: '#012CGF' },
      //   ],
      
      // }

      this.barChartOptions1 = {
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
        // scales: {
        //   x: {
        //     stacked: true,
        //   },
        //   y: {
        //     stacked: true,
        //   },
        // },
        plugins: {
          title: {
            display: true,
            text: chartData?.name,
            position: 'bottom'
          },
          legend: {
            display: true,
            position: 'bottom',
          },
          datalabels: {
            anchor: 'end',
            align: 'end'
          }
        }
      };
    });
  }

  loadLineChart() {
    let payload = {
      FromDate: this.filterValue != '' ? this.fromDate : this.startDate,
      ToDate: this.filterValue != '' ? this.toDate : this.endDate
    };
    let chartData: any;
    this.suggestionService.getLineChart(payload).subscribe(res => {
      chartData = res?.result;
      this.barChartLegend2 = true;
      this.barChartPlugins2 = [];
      this.barChartData2 = {
        labels: chartData?.labels,
        datasets: chartData?.values,
      };

      this.barChartOptions2 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: chartData?.name,
            position: 'bottom'
          },
        }
      };
    });
  }

  loadCategoryChart() {
    let payload = {
      FromDate: this.filterValue != '' ? this.fromDate : this.startDate,
      ToDate: this.filterValue != '' ? this.toDate : this.endDate
    };
    let chartData: any;
    this.suggestionService.getCategoryChart(payload).subscribe(res => {
      chartData = res?.result;
      this.pieChartLegend1 = true;
      this.pieChartOptions1 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: chartData?.name,
            position: 'bottom'
          }
        }
      };
      this.pieChartLabels1 = chartData?.labels;
      // chartData['values'] = [6, 26, 13, 33, 20];
      this.pieChartDatasets1 = [
        {
          data: chartData?.values,
          // label: chartData?.labels,
          backgroundColor: chartData?.backgroundColor,
          hoverOffset: 4
        }];
      this.pieChartPlugins1 = [];
      // backgroundColor: [
      //   'rgb(255, 99, 132)',
      //   'rgb(54, 162, 235)',
      //   'rgb(255, 205, 86)'
      // ],

      // chartData?.labels?.map((value: any, index: any) => {
      //   this.pieChartDatasets1 = [
      //     {
      //       data: chartData?.values[index],
      //       label: chartData?.labels[index],
      //       backgroundColor: chartData?.backgroundColor[index],
      //       hoverOffset: 4
      //     }]
      // })
    })
  }

  loadSuggestionChart() {
    let payload = {
      FromDate: this.filterValue != '' ? this.fromDate : this.startDate,
      ToDate: this.filterValue != '' ? this.toDate : this.endDate
    };
    let chartData: any;
    this.suggestionService.getSuggestionChart(payload).subscribe(res => {
      chartData = res?.result;
      this.pieChartLegend2 = true;
      this.pieChartOptions2 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: chartData?.name,
            position: 'bottom'
          }
        }
      };
      this.pieChartLabels2 = chartData?.labels;
      // chartData['values'] = [25, 71, 4];
      this.pieChartDatasets2 = [{
        data: chartData?.values,
        // label: chartData?.labels,
        backgroundColor: chartData?.backgroundColor,
        hoverOffset: 4
      }];
      this.pieChartPlugins2 = [];
    });
  }

  openToaster(content: any, duration: any, type: boolean, action?: any) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      // panelClass: [type ? "success" : "error"],
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
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
