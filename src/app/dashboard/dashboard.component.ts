import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData: any[] = [];

  private readonly grayPalette = ['#9e9e9e', '#bdbdbd', '#757575', '#cfcfcf', '#616161', '#e0e0e0'];

  // Bar Chart Data
  public barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    }
  };

  // Donut Chart Data
  public donutChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  public donutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.userData = data.tableUsers;
        this.setupCharts(data);
      },
      error: (err) => console.error('Error fetching dashboard data', err)
    });
  }

  setupCharts(data: any) {
    this.barChartData = {
      labels: data.chartBar.map((item: any) => item.name),
      datasets: [{
        data: data.chartBar.map((item: any) => item.value),
        backgroundColor: '#9e9e9e',
        hoverBackgroundColor: '#757575',
        borderWidth: 0
      }]
    };

    this.donutChartData = {
      labels: data.chartDonut.map((item: any) => item.name),
      datasets: [{
        data: data.chartDonut.map((item: any) => item.value),
        backgroundColor: this.grayPalette,
        borderWidth: 0
      }]
    };
  }

}
