import { ProductsService } from './../../services/products.service';
import { Product } from './../../models/product.model';
import { Party } from './../../models/party.model';
import { PartyService } from './../../services/party.service';
import { AlertComponent } from './../dialogs/alert/alert.component';
import { ContainerEditComponent } from './../container-edit/container-edit.component';
import { Result } from './../../models/result.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ContainerService } from './../../services/container.service';
import { Container } from './../../models/container.model';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  search: string;
  searchChanged: Subject<string> = new Subject<string>();

  containers: Container[];
  dbContainers: Container[];
  newContainer: Container;
  containerTotal = [];
  parties: Party[];
  products: Product[];
  quantitytemp: number;

  constructor(
    private containerService: ContainerService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private partyService: PartyService,
    private productService: ProductsService
  ) {
    this.searchChanged.pipe(
      debounceTime(500)
    ).pipe(
      distinctUntilChanged()
    ).subscribe(search => {
      this.search = search;
      if (this.search.length > 0) {
        this.containers = this.filteredSearch(this.search);
      } else {
        this.containers = this.dbContainers;
      }
    });
  }

  ngOnInit() {
    this.getContainers();
    this.getParties();
    this.setNewContainer();
  }

  filteredSearch = function (search) {
    const lowSearch = search.toLowerCase();
    return this.containers.filter(function(s) {
        return Object.values(s).some( val => String(val).toLowerCase().includes(lowSearch));
    });
  };

  searchRecords(text: string) {
    this.searchChanged.next(text);
  }

  setNewContainer() {
    this.newContainer = {
      id: 0,
      name: '',
      capacity: 0,
      unit: '',
      initial_quantity: 0
    };
  }

  getContainers () {
    const that = this;
    this.containerService.getContainers().then((res: Result) => {
      this.dbContainers = res.data;
      this.containers = this.dbContainers;
      this.containers.forEach((container, index) => {
        that.containerTotal[index] = 300;
      });
    });
  }

  getParties () {
    this.partyService.getParties().then((res: Result) => {
      this.parties = res.data;
    });
  }


  addEdit(container: Container) {
    const dialogRef = this.dialog.open(ContainerEditComponent, {
      width: '650px',
      disableClose: false,
      autoFocus: true,
      data: container
    });
    const that = this;
    dialogRef.afterClosed().subscribe(readyContainer => {
      if (readyContainer) {
        this.containerService.addEditContainer(readyContainer, that.parties).then(res => {
          console.log(res);
          if (res) {
            this.snackbar.open(`${readyContainer.name} successfully added / modified.`, '', { duration: 3000 });
            this.getContainers();
          } else {
            this.snackbar.open(`${readyContainer.name} could not be added / modified.`, '', { duration: 3000 });
          }
        });
      } else {
        this.getContainers();
      }
      this.setNewContainer();
    });
  }

  delete (container: Container) {

    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      disableClose: true,
      autoFocus: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.containerService.deleteContainer(container.id).then(res => {
          console.log(res);
          if (res) {
            this.snackbar.open(`${container.name} successfully deleted.`, '', { duration: 3000 });
            this.getContainers();
          } else {
            this.snackbar.open(`${container.name} could not be deleted.`, '', { duration: 3000 });
          }
        });
      }
    });
  }

  updateContainerInitalDistribution (i, j) {
    // ok
  }
}
