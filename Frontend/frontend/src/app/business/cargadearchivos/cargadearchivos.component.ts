import { Component, ViewChild, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService } from '../../services/admin.service';
import { AdminUserRegister } from '../../models/AdminUserRegister';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { ResponseAdminUserRegister } from '../../interface/ResponseAdminUserRegister';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cargadearchivos',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './cargadearchivos.component.html',
  styleUrls: ['./cargadearchivos.component.css']
})
export default class CargadearchivosComponent {
  displayedColumns: string[] = ['username', 'email', 'password', 'rol_idrol', 'creationdate', 'usercreate', 'userapproval', 'dateapproval', 'userstatus_idstatus'];
  dataSource = new MatTableDataSource<AdminUserRegister>([]);
  selectedFile: File | null = null;
  private snackBar = inject(MatSnackBar);


  constructor(private adminService: AdminService) {}



  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const fileType = this.selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileType === 'csv') {
        this.parseCSVFile(this.selectedFile);
      } else if (fileType === 'xlsx' || fileType === 'xls') {
        this.parseExcelFile(this.selectedFile);
      } else {
        this.snackBar.open('Formato de archivo no soportado. Por favor, suba un archivo CSV o Excel.', 'Cerrar', { duration: 3000 });
      }
    }
  }

  parseCSVFile(file: File) {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        this.dataSource.data = result.data as AdminUserRegister[];
      },
      error: (error) => {
        console.error('Error al analizar el archivo CSV:', error);
        this.snackBar.open('Error al analizar el archivo CSV.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  parseExcelFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

      const headers = data[0];
      const rows = data.slice(1);
      const users: AdminUserRegister[] = rows.map(row => {
        const user: any = {};
        headers.forEach((header: string, index: number) => {
          let value = row[index];
          if (header.includes('date') && value) {
            const parsedDate = new Date(value);
            if (!isNaN(parsedDate.getTime())) {
              value = parsedDate.toISOString();
            } else {
              value = null;
            }
          }
          user[header] = value;
        });
        return user as AdminUserRegister;
      });
      this.dataSource.data = users;
    };
    reader.readAsBinaryString(file);
  }



  createUsers() {
    const users: AdminUserRegister[] = this.dataSource.data;
    users.forEach(user => {
      if (user.creationdate) {
        user.creationdate = new Date(user.creationdate).toISOString();
      }
      if (user.dateapproval) {
        user.dateapproval = new Date(user.dateapproval).toISOString();
      }

      this.adminService.userRegister(user).subscribe(
        (response: ResponseAdminUserRegister) => {
          console.log('Usuarios registrados:', response);
          this.snackBar.open(`Usuarios registrados exitosamente.`, 'Cerrar', { duration: 3000 });
        },
        (error) => {
          console.error('Error al registrar el usuario:', error);
          this.snackBar.open(`Error al registrar el usuario ${user.username}.`, 'Cerrar', { duration: 3000 });
        }
      );
    });
  }

}
