import { Component, inject, ViewChild, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mantenimiento',
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
  templateUrl: './mantenimiento.component.html',
  styleUrl: './mantenimiento.component.css'
})
export default class MantenimientoComponent implements OnInit, AfterViewInit{
  public isLoadingProfile = true;
  public displayedColumns: string[] = ['name', 'lastname', 'identification', 'email', 'phonenumber', 'address', 'referenceaddress'];
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
    this.router.navigate(['/layout/actualizarclientes'], { state: { client: row } });
  }

  loadProfileData() {
    this.isLoadingProfile = true;
    this.clientService.getAllClients().subscribe({
      next: (data: Client[]) => {
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
