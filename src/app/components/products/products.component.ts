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
  newProduct: Product;
  constructor(
    private productService: ProductsService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProducts();
    this.newProduct = {
      id: 0,
      name: '',
      unit: 'm3',
      base_rate: 0
    };
  }

  getProducts () {
    this.productService.getProducts().then((res: Result) => {
      this.products = res.data;
      console.log(this.products);
    });
  }

  addEdit(product: Product) {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '650px',
      disableClose: true,
      autoFocus: true,
      data: product
    });

    dialogRef.afterClosed().subscribe(readyProduct => {
      if (readyProduct) {
        this.productService.addEditProduct(readyProduct).then(res => {
          console.log(res);
          if (res) {
            this.snackbar.open(`${readyProduct.name} successfully added / modified.`, '', { duration: 3000 });
            this.getProducts();
          } else {
            this.snackbar.open(`${readyProduct.name} could not be added / modified.`, '', { duration: 3000 });
          }
        });
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
            this.snackbar.open(`${product.name} successfully deleted.`, '', { duration: 3000 });
            this.getProducts();
          } else {
            this.snackbar.open(`${product.name} could not be deleted.`, '', { duration: 3000 });
          }
        });
      }
    });
  }

}
