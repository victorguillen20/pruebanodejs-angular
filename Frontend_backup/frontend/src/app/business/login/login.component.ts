import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { Login } from '../../models/Login';
import { AuthService } from '../../services/auth.service';
import { UserlogService } from '../../services/userlog.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  public auth = inject(AuthService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private userLog = inject(UserlogService);

  public formlogin: FormGroup = this.formBuild.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  })

  inicioSesion() {

    if(this.formlogin.invalid)return;
    const objeto:Login = {
      username: this.formlogin.value.username,
      password: this.formlogin.value.password
    }

    this.auth.login(objeto).subscribe({
      next: (data)=> {
        console.log('respuesta del login: ', data.message)
        if(data.isValid){
          console.log('respuesta del data: ', data.isValid)
          this.userLog.setRole(data.rol);
          this.router.navigate(['/layout']);
        } else {
          this.snackBar.open(data.message, 'Cerrar', { duration: 2000 });
        }
      },
      error:(error) => {
        this.snackBar.open('Error de conexion', 'Cerrar', { duration: 2000 });
      }
    })

  }

  navigateToRecoverPassword() {
    this.router.navigate(['recoverpassword']);
  }
}
