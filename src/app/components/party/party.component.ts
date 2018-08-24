import { Container } from './../../models/container.model';
import { ContainerService } from './../../services/container.service';
import { StaffComponent } from './../staff/staff.component';
import { StaffService } from './../../services/staff.service';
import { Staff } from './../../models/staff.model';
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

import { Subject, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {
  search: string;
  searchChanged: Subject<string> = new Subject<string>();

  parties: Party[];
  dbparties: Party[];
  partyprices: PartyPrice[];
  staffs: Staff[];
  products: Product[];
  newParty: Party;
  containers: Container[];

  constructor(
    private partyService: PartyService,
    private productService: ProductsService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private staffService: StaffService,
    private containerService: ContainerService
  ) {

      this.searchChanged.pipe(
        debounceTime(500) // wait 300ms after the last event before emitting last event
      ).pipe(
        distinctUntilChanged() // only emit if value is different from previous value
      ).subscribe(search => {
        this.search = search;
        if (this.search.length > 0) {
          this.parties = this.filteredSearch(this.search);
        } else {
          this.parties = this.dbparties;
        }
      });
   }

  ngOnInit() {
    this.getPartys();
    this.getProducts();
    this.getContainers();
    this.setNewParty();
  }

  filteredSearch = function (search) {
    const lowSearch = search.toLowerCase();
    return this.parties.filter(function(s) {
        return Object.values(s).some( val => String(val).toLowerCase().includes(lowSearch));
    });
  };

  searchRecords(text: string) {
    this.searchChanged.next(text);
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
      this.dbparties = res.data;
      this.parties = this.dbparties;
      console.log(this.parties);
    });
  }

  getProducts () {
    this.productService.getProducts().then((res: Result) => {
      this.products = res.data;
    });
  }

  getContainers() {
    this.containerService.getContainers().then((res: Result) => {
      this.containers = res.data;
    });
  }

  async getPartyPrice (party_id: number) {
    await this.partyService.getPartyPrice(party_id).then((res: Result) => {
      this.partyprices = res.data;
    });
  }

  async getStaffs (party_id: number) {
    await this.staffService.getStaffs(party_id).then((res: Result) => {
      this.staffs = res.data;
    });
  }

  addEdit(party: Party) {
    const dialogRef = this.dialog.open(PartyEditComponent, {
      width: '650px',
      disableClose: false,
      autoFocus: true,
      data: party
    });
    const that = this;
    dialogRef.afterClosed().subscribe(readyParty => {
      if (readyParty) {
        this.partyService.addEditParty(readyParty, that.products, that.containers).then(res => {
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
      disableClose: false,
      autoFocus: true,
      data: data
    });
  }

  async manageStaffs(party: Party) {
    await this.getStaffs(party.id);
    console.log('pp', this.staffs);
    const data = {
      staffs: this.staffs,
      party_name: party.name,
      party_id: party.id
    };
    this.dialog.open(StaffComponent, {
      width: '700px',
      disableClose: false,
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
