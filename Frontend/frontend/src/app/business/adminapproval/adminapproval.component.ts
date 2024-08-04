import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule, formatDate } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ResponseViewContracts } from '../../interface/ResponseViewContracts';
import { UnapprovedUser } from '../../models/UnapprovedUser';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { UserlogService } from '../../services/userlog.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-adminapproval',
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
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './adminapproval.component.html',
  styleUrl: './adminapproval.component.css'
})
export default class AdminapprovalComponent {
  public isLoadingProfile = true;
  private adminService = inject(AdminService);
  private userlogService = inject(UserlogService);
  private userService = inject(UserService);

  public displayedColumns: string[] = ['username',
    'email',
    'creationdate',
    'rolname',
    'description'];
  public dataSource = new MatTableDataSource<any>();
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadProfileData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadProfileData() {
    this.isLoadingProfile = true;
    this.adminService.getUnapprovedUser().subscribe({
      next: (data: UnapprovedUser[]) => {
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

  openDialog(username: string): void {
    console.log('Opening dialog for:', username); // Verifica si se llama al método
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { username }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.approveUser(result);
      }
    });
  }

  approveUser(username: string): void {
    const loggedInUsername = this.userlogService.getUsername();
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const status = 'A';

    if (loggedInUsername) {
      this.userService.getId({ username: loggedInUsername }).subscribe({
        next: (response) => {
          const userId = response.userid;
          this.adminService.userAproved({
            username,
            userapproval: userId,
            dateapproval: currentDate,
            userstatus_idstatus: status
          }).subscribe({
            next: () => {
              this.snackBar.open('Usuario aprobado', 'Cerrar', { duration: 3000 });
              this.loadProfileData();  // Recargar los datos después de la aprobación
            },
            error: () => {
              this.snackBar.open('Error al aprobar el usuario', 'Cerrar', { duration: 3000 });
            }
          });
        },
        error: () => {
          this.snackBar.open('Error al obtener el ID del usuario', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Usuario no autenticado', 'Cerrar', { duration: 3000 });
    }
  }


}
