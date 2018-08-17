import { Party } from './../../models/party.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-party-edit',
  templateUrl: './party-edit.component.html',
  styleUrls: ['./party-edit.component.scss']
})
export class PartyEditComponent implements OnInit {
  party: Party;
  constructor(
    private dialogRef: MatDialogRef<PartyEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: Party
  ) {
    this.party = data;
   }

  ngOnInit() {
  }

  close(res: any) {
    this.dialogRef.close(res);
  }

}
