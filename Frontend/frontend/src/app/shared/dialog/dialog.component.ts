import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-dialog',
  template: `
    <h2 mat-dialog-title>Aprobar Usuario</h2>
    <div mat-dialog-content>
      Desea Aprobar el Usuario?
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close (click)="onCancel()">Cancelar</button>
      <button mat-button mat-dialog-close cdkFocusInitial (click)="onApprove()">Ok</button>
    </div>
  `,
  styles: [
    `
      h2 {
        margin: 0;
        font-size: 1.25em;
      }
      mat-dialog-content {
        margin: 0 0 20px 0;
        font-size: 1em;
      }
      mat-dialog-actions {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent
  ]
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { username: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onApprove(): void {
    this.dialogRef.close(this.data.username);
  }
}
