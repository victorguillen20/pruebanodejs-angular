import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ResponseViewContracts } from '../../interface/ResponseViewContracts';

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatPaginator,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.css'
})
export default class ContratosComponent implements OnInit{
  public isLoadingProfile = true;
  public displayedColumns: string[] = ['idcontract', 'startdate', 'enddate', 'servicename',
    'velocity', 'price', 'identification', 'descriptionpago', 'descriptioncontrato'];
  public dataSource = new MatTableDataSource<any>();
  private snackBar = inject(MatSnackBar);
  private clientService = inject(ClientService);
  private router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadProfileData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowClicked(row: any) {
    this.router.navigate(['/layout/actualizarcontratos'], { queryParams: { identification: row.identification } });
  }

  loadProfileData() {
    this.isLoadingProfile = true;
    this.clientService.getContracts().subscribe({
      next: (data: ResponseViewContracts[]) => {
        this.dataSource.data = data;
        this.isLoadingProfile = false;
      },
      error: (err) => {
        this.snackBar.open('Error al cargar los datos', 'Cerrar', {
          duration: 3000,
        });
        this.isLoadingProfile = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
