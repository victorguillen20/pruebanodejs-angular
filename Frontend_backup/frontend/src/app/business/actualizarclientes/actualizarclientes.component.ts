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
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-actualizarclientes',
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
  templateUrl: './actualizarclientes.component.html',
  styleUrl: './actualizarclientes.component.css'
})
export default class ActualizarclientesComponent implements OnInit{
  public actualizaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.actualizaForm = this.fb.group({
      name: ['', Validators.pattern('^[a-zA-Z ]*$')],
      lastname: ['', Validators.pattern('^[a-zA-Z ]*$')],
      identification: ['', Validators.pattern('^[0-9]*$')],
      email: ['', Validators.email],
      phonenumber: ['', Validators.pattern('^[0-9]*$')],
      address: [''],
      referenceaddress: ['']
    });
    const client = history.state.client as Client;
    if (client) {
      this.actualizaForm.patchValue(client);
    }
  }
  actualizarCliente() {
    if (this.actualizaForm.valid) {
      const updatedClient: Client = this.actualizaForm.value;
      this.clientService.updateClient(updatedClient).subscribe({
        next: (response) => {
          this.snackBar.open(response.message, 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/layout/mantenimiento']);
        },
        error: (err) => {
          this.snackBar.open('Error al actualizar el cliente', 'Cerrar', {
            duration: 3000,
          });
        }
      });
    }
  }
}
