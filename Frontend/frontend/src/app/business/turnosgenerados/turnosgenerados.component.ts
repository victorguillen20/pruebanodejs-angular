import { Component, inject, ViewChild, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TurnService } from '../../services/turn.service';
import { GestorTurnView } from '../../models/GestorTurnView';

@Component({
  selector: 'app-turnosgenerados',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatPaginator,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './turnosgenerados.component.html',
  styleUrl: './turnosgenerados.component.css'
})
export default class TurnosgeneradosComponent implements OnInit, AfterViewInit{
  public isLoadingTurn = true;
  public displayedColumns: string[] = ['description', 'date', 'cashdescription'];
  public dataSource = new MatTableDataSource<any>();
  private snackBar = inject(MatSnackBar);
  private turnService = inject(TurnService);
  private router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadTurnData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadTurnData() {
    this.isLoadingTurn = true;
    this.turnService.getAllTurns().subscribe({
      next: (data: GestorTurnView[]) => {
        this.dataSource.data = data;
        this.isLoadingTurn = false;
      },
      error: (err) => {
        this.snackBar.open('Error al cargar los datos', 'Cerrar', {
          duration: 3000,
        });
        this.isLoadingTurn = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
