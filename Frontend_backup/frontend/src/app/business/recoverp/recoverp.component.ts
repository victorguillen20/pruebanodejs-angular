import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-recoverp',
  template: `
    <h2 mat-dialog-title>Recuperar Password</h2>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>New Password</mat-label>
        <input matInput [(ngModel)]="newPassword" type="text">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button [mat-dialog-close]="newPassword" cdkFocusInitial>Ok</button>
    </div>
  `,
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule
  ]
})
export class RecoverpComponent {
  newPassword: string = '';

  constructor(public dialogRef: MatDialogRef<RecoverpComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

}
