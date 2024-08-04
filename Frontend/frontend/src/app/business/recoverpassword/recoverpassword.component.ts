  import { Component, inject, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { MatDialog, MatDialogModule } from '@angular/material/dialog';
  import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
  import { UserService } from '../../services/user.service';
  import { User } from '../../models/User';
  import { RecoverpComponent } from '../recoverp/recoverp.component';
  import { CommonModule } from '@angular/common';
  import { catchError } from 'rxjs/operators';

  @Component({
    selector: 'app-recoverpassword',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatSnackBarModule,
      MatDialogModule,
    ],
    templateUrl: './recoverpassword.component.html',
    styleUrls: ['./recoverpassword.component.css']
  })
  export class RecoverpasswordComponent {
    recoverForm: FormGroup;
    public userService = inject(UserService);

    constructor(
      private fb: FormBuilder,
      private snackBar: MatSnackBar,
      private dialog: MatDialog
    ) {
      this.recoverForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
    }

    onSubmit() {
      console.log('Formulario enviado'); // Verificar si esta línea se ejecuta
      if (this.recoverForm.valid) {
        const user: User = this.recoverForm.value;
        console.log('Datos del usuario:', user);

        this.userService.userAndEmailExist(user).subscribe({
          next: (data) => {
            console.log('Response:', data); // Verificar la respuesta aquí
            if (data.success) {
              console.log('Abriendo diálogo'); // Verificar si esta línea se ejecuta
              this.openRecoverDialog(user);
            } else {
              this.snackBar.open(data.message, 'Cerrar', {
                duration: 3000,
              });
            }
          },
          error: (error) => {
            console.error('Error:', error);
            this.snackBar.open('Credenciales incorrectas', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      } else {
        console.log('Formulario inválido');
      }
    }

    openRecoverDialog(user: User): void {
      const dialogRef = this.dialog.open(RecoverpComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          user.password = result;
          this.updatePassword(user);
        }
      });
    }

    updatePassword(user: User): void {
      this.userService.updatePassword(user).subscribe(
        (response) => {
          this.snackBar.open(response.message, 'Cerrar', {
            duration: 3000,
          });
          if (response.success) {
            setTimeout(() => {
              this.snackBar.dismiss();
            }, 3000);
          }
        },
        (error) => {
          console.error('Error:', error);
          this.snackBar.open('Ocurrió un error al actualizar la contraseña.', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
  }
