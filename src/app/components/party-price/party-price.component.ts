import { PartyService } from './../../services/party.service';
import { PartyPrice } from './../../models/party-price.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-party-price',
  templateUrl: './party-price.component.html',
  styleUrls: ['./party-price.component.scss']
})
export class PartyPriceComponent implements OnInit {

  partyprices: PartyPrice[];
  party_name: String;
  constructor(
    private dialogRef: MatDialogRef<PartyPriceComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private partyService: PartyService,
    private snackbar: MatSnackBar
  ) {
    this.partyprices = data.partyprices as PartyPrice[];
    this.party_name = data.party_name as String;
   }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(null);
  }

  updatePartyPrice (id: number, rate: number) {
    this.partyService.updatePrice(id, rate).then(res => {
      if (res) {
        this.snackbar.open(`Successfully modified.`, '', { duration: 1000 });
      } else {
        this.snackbar.open(`Could NOT be modified.`, '', { duration: 1000 });
      }
    });
  }

}
