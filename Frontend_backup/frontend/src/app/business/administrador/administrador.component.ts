import { Component, inject, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ResponseAdminGetProfile } from '../../interface/ResponseAdminGetProfile';
import { MatSelectModule } from '@angular/material/select';
import { AdminUpdateUser } from '../../models/AdminUpdateUsers';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [MatCardModule,
    MatTableModule,
    CommonModule,
    MatPaginator,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export default class AdministradorComponent implements OnInit, AfterViewInit{


  public isLoadingProfile = true;
  public displayedColumns: string[] = ['username', 'email', 'creationdate', 'rolname', 'description'];
  public dataSource = new MatTableDataSource<any>();
  private snackBar = inject(MatSnackBar);

  public updateUserForm: FormGroup;
  private selectedUsername: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Opciones para el select
  public statusOptions = [
    { value: 'A', viewValue: 'Activo' },
    { value: 'I', viewValue: 'Inactivo' },
    { value: 'B', viewValue: 'Bloqueado' }
  ];

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    // Inicializar el formulario
    this.updateUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.adminService.getProfile().subscribe((response: ResponseAdminGetProfile) => {
      console.log(response);
      this.dataSource.data = response.userData;
      this.isLoadingProfile = false;
    }, (error) => {
      console.error('Error al obtener los perfiles:', error);
      this.isLoadingProfile = false;
    });
    this.loadProfileData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  // Método para manejar la selección de una fila
  onRowClicked(row: any) {
    this.selectedUsername = row.username;
    this.updateUserForm.patchValue({
      email: row.email
    });
  }

  onSubmit() {
    if (this.updateUserForm.valid && this.selectedUsername) {
      const formValues = this.updateUserForm.value;
      const updateUser: AdminUpdateUser = {
        username: this.selectedUsername,
        email: formValues.email,
        userstatus_idstatus: formValues.status
      };
      this.adminService.updateProfile(updateUser).subscribe(response => {
        console.log('Actualización exitosa:', response);
        this.snackBar.open('Actualización exitosa',
          'Cerrar', { duration: 2000 });
        // Recargar los datos de la tabla
        this.loadProfileData();
        // Restablecer el formulario
        this.resetForm();
      }, error => {
        console.error('Error en la actualización:', error);
        this.snackBar.open('Error en la actualización',
          'Cerrar', { duration: 2000 });
      });
    } else {
      console.log('Formulario no válido o no se ha seleccionado un usuario');
      this.snackBar.open('Formulario no válido o no se ha seleccionado un usuario',
        'Cerrar', { duration: 2000 });
    }
  }

  resetForm() {
    this.updateUserForm.reset();
    this.selectedUsername = null;
  }



  loadProfileData() {
    this.isLoadingProfile = true;
    this.adminService.getProfile().subscribe((response: ResponseAdminGetProfile) => {
      console.log(response); // Añade esta línea para ver los datos recibidos
      this.dataSource.data = response.userData;
      this.isLoadingProfile = false;
    }, (error) => {
      console.error('Error al obtener los perfiles:', error);
      this.isLoadingProfile = false;
    });
  }



}
