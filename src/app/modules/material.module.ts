import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatListModule,
  MatDividerModule,
  MatChipsModule,
  MatMenuModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
  MatFormFieldModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatListModule,
  MatDividerModule,
  MatChipsModule,
  MatMenuModule,
  MatDialogModule,
  MatSnackBarModule
  ],
  exports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})

export class MaterialModule {}
