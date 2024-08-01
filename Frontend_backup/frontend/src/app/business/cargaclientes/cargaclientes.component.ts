import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { ResponseClient } from '../../interface/ResponseClient';

@Component({
  selector: 'app-cargaclientes',
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
  templateUrl: './cargaclientes.component.html',
  styleUrl: './cargaclientes.component.css'
})
export default class CargaclientesComponent {
  private clientService = inject(ClientService);
  private snackBar = inject(MatSnackBar);
  selectedFile: File | null = null;
  clients: Client[] = [];

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
        this.clients = result.data as Client[];
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
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Eliminar filas vacías y cabeceras no válidas
      const validData = data.filter((row: any) => Object.values(row).some(value => value !== null && value !== undefined && value !== ''));

      this.clients = validData.slice(1).map((row: any) => {
        return {
          name: row[0] || '',
          lastname: row[1] || '',
          identification: row[2] || '',
          email: row[3] || '',
          phonenumber: row[4] || '',
          address: row[5] || '',
          referenceaddress: row[6] || ''
        } as Client;
      });
    };
    reader.readAsBinaryString(file);
  }

  createClients() {
    this.clients.forEach(client => {
      this.clientService.registerClient(client).subscribe(
        (response: ResponseClient) => {
          console.log('Clientes registrados');
          this.snackBar.open('Clientes registrados exitosamente.', 'Cerrar', { duration: 3000 });
        },
        (error) => {
          console.error('Error al registrar el cliente:', error);
          this.snackBar.open(`Error al registrar el cliente ${client.name}.`, 'Cerrar', { duration: 3000 });
        }
      );
    });
  }
}
