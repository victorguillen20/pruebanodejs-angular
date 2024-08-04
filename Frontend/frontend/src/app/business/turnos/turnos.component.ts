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
import { UserlogService } from '../../services/userlog.service';
import { TurnService } from '../../services/turn.service';
import { Turn } from '../../models/Turn';

@Component({
  selector: 'app-turnos',
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
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export default class TurnosComponent implements OnInit {
  public turnoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userlogService: UserlogService,
    private turnService: TurnService
  ) {}

  ngOnInit() {
    this.turnoForm = this.fb.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
      cash_cashid: ['', Validators.required]
    });
  }

  registrarTurno() {
    if (this.turnoForm.valid) {
      const username = this.userlogService.getUsername();
      if (!username) {
        this.snackBar.open('Error: No se pudo obtener el nombre de usuario', 'Cerrar', { duration: 3000 });
        return;
      }
      // Obtener la fecha seleccionada y ajustar para asegurar que se maneje correctamente la zona horaria
      const selectedDate = this.turnoForm.value.date;
      const adjustedDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
      const formattedDate = adjustedDate.toISOString().split('T')[0];

      const turnoData: Turn = {
        ...this.turnoForm.value,
        date: formattedDate, // Usar la fecha ajustada
        username: username
      };
      console.log('Datos del turno:', turnoData);
      this.turnService.generateTurn(turnoData).subscribe(
        response => {
          if (response.success) {
            this.snackBar.open('Turno registrado con éxito', 'Cerrar', { duration: 3000 });
          } else {
            this.snackBar.open(`Error: ${response.message}`, 'Cerrar', { duration: 3000 });
          }
        },
        error => {
          this.snackBar.open('Error al registrar el turno', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      console.log('Formulario no válido');
      this.snackBar.open('Formulario no válido', 'Cerrar', { duration: 3000 });
    }
  }
}
