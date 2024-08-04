import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ResponseMarcadores } from '../../interface/ResponseMarcadores';
import { AdminService } from '../../services/admin.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { ResponseCaja } from '../../interface/ResponseCaja';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,
    MatTableModule,
    CommonModule,
    MatPaginator,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit, AfterViewInit{

  totalUsuarios: string = '0';
  totalBloqueados: string = '0';
  totalInactivos: string = '0';
  totalActivos: string = '0';
  totalClientes: string = '0';

  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['cashdescription', 'username', 'creationdate', 'usercreate'];
  public isLoadingCash = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getMarcadores().subscribe((data: ResponseMarcadores) => {
      this.totalUsuarios = data.totalusuarios;
      this.totalBloqueados = data.totalbloqueados;
      this.totalInactivos = data.totalinactivos;
      this.totalActivos = data.totalactivos;
      this.totalClientes = data.totalclientes;
    });

    this.adminService.getCash().subscribe((response: ResponseCaja) => {
      this.dataSource.data = response.values;
      this.isLoadingCash = false;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
