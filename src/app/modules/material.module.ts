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
  MatMenuModule
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
  MatMenuModule
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
    MatMenuModule
  ]
})

export class MaterialModule {}
