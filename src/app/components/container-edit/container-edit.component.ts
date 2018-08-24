import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Container } from './../../models/container.model';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.scss']
})
export class ContainerEditComponent implements OnInit {
  container: Container;
  constructor(
    private dialogRef: MatDialogRef<ContainerEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: Container
  ) {
    this.container = data;
    console.log(this.container);
  }

  ngOnInit() {
  }

  close (res: any) {
    this.dialogRef.close(res);
  }

}
