import { PartyEditComponent } from './../party-edit/party-edit.component';
import { PartyService } from './../../services/party.service';
import { Party } from './../../models/party.model';

import { Component, OnInit } from '@angular/core';
import { Result } from '../../models/result.model';
import { AlertComponent } from '../dialogs/alert/alert.component';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {

  parties: Party[];
  newParty: Party;
  constructor(
    private partyService: PartyService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPartys();
    this.setNewParty();
  }

  setNewParty() {
    this.newParty = {
      id: 0,
      code: '',
      name: '',
      email: '',
      address: '',
      deposit: 0,
      initial_balance: 0,
      self: 0
    };
  }

  getPartys () {
    this.partyService.getParties().then((res: Result) => {
      this.parties = res.data;
      console.log(this.parties);
    });
  }

  addEdit(party: Party) {
    const dialogRef = this.dialog.open(PartyEditComponent, {
      width: '650px',
      height: '700px',
      disableClose: true,
      autoFocus: true,
      data: party
    });

    dialogRef.afterClosed().subscribe(readyParty => {
      if (readyParty) {
        this.partyService.addEditParty(readyParty).then(res => {
          console.log(res);
          if (res) {
            this.snackbar.open(`${readyParty.name} successfully added / modified.`, '', { duration: 3000 });
            this.getPartys();
          } else {
            this.snackbar.open(`${readyParty.name} could not be added / modified.`, '', { duration: 3000 });
          }
        });
      } else {
        this.getPartys();
      }
      this.setNewParty();
    });
  }

  delete (party: Party) {

    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      disableClose: true,
      autoFocus: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.partyService.deleteParty(party.id).then(res => {
          console.log(res);
          if (res) {
            this.snackbar.open(`${party.name} successfully deleted.`, '', { duration: 3000 });
            this.getPartys();
          } else {
            this.snackbar.open(`${party.name} could not be deleted.`, '', { duration: 3000 });
          }
        });
      }
    });
  }

}
