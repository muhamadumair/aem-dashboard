import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData } from 'chart.js';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../services/auth.service';
import { DashboardService } from '../services/dashboard.service';

interface ChartPoint { name: string; value: number; }
interface User { firstName: string; lastName: string; username: string; }
interface DashboardResponse {
  chartBar: ChartPoint[];
  chartDonut: ChartPoint[];
  tableUsers: User[];
}

const GRAY_PALETTE = ['#9e9e9e', '#bdbdbd', '#757575', '#cfcfcf', '#616161', '#e0e0e0'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];

  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  donutChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    }
  };

  donutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  constructor(
    private dashboard: DashboardService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dashboard.getDashboardData().subscribe({
      next: (data: DashboardResponse) => {
        this.users = data.tableUsers;
        this.barChartData = this.toBarChart(data.chartBar);
        this.donutChartData = this.toDonutChart(data.chartDonut);
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error('Session expired. Please log in again.');
          this.logout();
          return;
        }
        this.toastr.error('Failed to load dashboard data.');
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private toBarChart(points: ChartPoint[]): ChartData<'bar'> {
    return {
      labels: points.map(p => p.name),
      datasets: [{
        data: points.map(p => p.value),
        backgroundColor: '#9e9e9e',
        hoverBackgroundColor: '#757575',
        borderWidth: 0
      }]
    };
  }

  private toDonutChart(points: ChartPoint[]): ChartData<'doughnut'> {
    return {
      labels: points.map(p => p.name),
      datasets: [{
        data: points.map(p => p.value),
        backgroundColor: GRAY_PALETTE,
        borderWidth: 0
      }]
    };
  }
}
