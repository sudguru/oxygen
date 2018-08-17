import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  oldProduct: Product;
  constructor(
    private dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: Product
  ) {
    this.product = data;
    this.oldProduct = this.product;
   }

  ngOnInit() {
  }

  close(res: any) {
    this.dialogRef.close(res);
  }

}
