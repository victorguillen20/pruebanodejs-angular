import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserlogService } from '../../services/userlog.service';
import { RegisterRegularUser } from '../../models/RegisterRegularUser';
import { GetidbyUser } from '../../models/GetidbyUser';

@Component({
  selector: 'app-createusergestor',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './createusergestor.component.html',
  styleUrl: './createusergestor.component.css'
})
export default class CreateusergestorComponent {
  public userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private userlogService: UserlogService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol_idrol: ['', Validators.required]
    });
  }

  registrarUsuario(){
    // Tomar datos del formulario
    const username = this.userForm.get('username')?.value;
    const email = this.userForm.get('email')?.value;
    const password = this.userForm.get('password')?.value;
    const rol_idrol = this.userForm.get('rol_idrol')?.value;

    // Obtener la fecha actual en formato YYYY-MM-DD
    const creationdate = new Date().toISOString().split('T')[0];

    // Recuperar el username del usuario logueado
    const loggedUsername = this.userlogService.getUsername();

    if (loggedUsername) {
      // Obtener el ID del usuario que creó
      const getUserIdRequest: GetidbyUser = { username: loggedUsername };

      this.userService.getId(getUserIdRequest).subscribe(response => {
        const usercreate = response.userid;

        // Crear el objeto para registrar al nuevo usuario
        const registerData: RegisterRegularUser = {
          username,
          email,
          password,
          rol_idrol,
          creationdate,
          usercreate
        };

        // Llamar al servicio para registrar el usuario
        this.userService.registerUser(registerData).subscribe(
          (res) => {
            // Mostrar mensaje de éxito
            this.snackBar.open(res.message, 'Cerrar', { duration: 3000 });
          },
          (err) => {
            // Mostrar mensaje de error
            this.snackBar.open('Error al registrar el usuario', 'Cerrar', { duration: 3000 });
          }
        );
      });
    } else {
      this.snackBar.open('No se pudo obtener el nombre de usuario del usuario logueado.', 'Cerrar', { duration: 3000 });
    }
  }

}
