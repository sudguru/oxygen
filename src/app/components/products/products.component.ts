import { Observable } from 'rxjs';
import { ProductEditComponent } from './../product-edit/product-edit.component';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { Result } from '../../models/result.model';
import { AlertComponent } from '../dialogs/alert/alert.component';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  constructor(
    private productService: ProductsService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts () {
    this.productService.getProducts().subscribe((res: Result) => {
      this.products = res.data;
      console.log(this.products);
    });
  }

  edit(product: Product) {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '650px',
      disableClose: true,
      autoFocus: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.productService.deleteProduct(product.id).then(res => {
        //   console.log(res);
        //   if (res) {
        //     this.snackbar.open(`${product.name} successfully deleted.`);
        //   } else {
        //     this.snackbar.open(`${product.name} could not be deleted.`);
        //   }
        // });
      }
    });
  }

  delete (product: Product) {

    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      disableClose: true,
      autoFocus: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(product.id).then(res => {
          console.log(res);
          if (res) {
            this.snackbar.open(`${product.name} successfully deleted.`, '', { duration: 500 });
            this.getProducts();
          } else {
            this.snackbar.open(`${product.name} could not be deleted.`, '', { duration: 500 });
          }
        });
      }
    });
  }

}
