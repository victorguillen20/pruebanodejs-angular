import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientService } from '../../services/client.service';
import { Contract } from '../../models/Contract';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizarcontratos',
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
  templateUrl: './actualizarcontratos.component.html',
  styleUrl: './actualizarcontratos.component.css'
})
export default class ActualizarcontratosComponent {
  public contratoForm!: FormGroup;
  private snackBar: MatSnackBar;
  private clientService: ClientService;
  private router: Router;
  private route: ActivatedRoute;

  constructor(
    private fb: FormBuilder,
    snackBar: MatSnackBar,
    clientService: ClientService,
    router: Router,
    route: ActivatedRoute
  ) {
    this.snackBar = snackBar;
    this.clientService = clientService;
    this.router = router;
    this.route = route;
  }

  ngOnInit() {
    this.contratoForm = this.fb.group({
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      service_idservice: ['', Validators.required],
      statuscontract_idstatus: ['', Validators.required],
      identification: ['', Validators.required],
      methodpayment_idmethodpayment: ['', Validators.required]
    });
    this.route.queryParams.subscribe(params => {
      const identification = params['identification'];
      if (identification) {
        this.contratoForm.patchValue({ identification });
      }
    });
  }

  actualizarContrato(){
    if (this.contratoForm.valid) {
      const contractData = this.contratoForm.value;
      this.clientService.registerContract(contractData).subscribe({
        next: () => {
          this.snackBar.open('Contrato actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/layout/contratos']);
        },
        error: () => {
          this.snackBar.open('Error al actualizar el contrato', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
