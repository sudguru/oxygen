import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { PartyPrice } from './../../models/party-price.model';
import { PartyPriceComponent } from './../party-price/party-price.component';
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
  partyprices: PartyPrice[];
  products: Product[];
  newParty: Party;
  search: string;
  constructor(
    private partyService: PartyService,
    private productService: ProductsService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPartys();
    this.getProducts();
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
      // console.log(this.parties);
    });
  }

  getProducts () {
    this.productService.getProducts().then((res: Result) => {
      this.products = res.data;
    });
  }

  async getPartyPrice (party_id: number) {
    await this.partyService.getPartyPrice(party_id).then((res: Result) => {
      this.partyprices = res.data;
      console.log('ppp', this.partyprices);
    });
  }

  addEdit(party: Party) {
    const dialogRef = this.dialog.open(PartyEditComponent, {
      width: '650px',
      disableClose: true,
      autoFocus: true,
      data: party
    });
    const that = this;
    dialogRef.afterClosed().subscribe(readyParty => {
      if (readyParty) {
        this.partyService.addEditParty(readyParty, that.products).then(res => {
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

  async manageRates(party: Party) {
    await this.getPartyPrice(party.id);
    console.log('pp', this.partyprices);
    const data = {
      partyprices: this.partyprices,
      party_name: party.name
    };
    this.dialog.open(PartyPriceComponent, {
      width: '650px',
      disableClose: true,
      autoFocus: true,
      data: data
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
