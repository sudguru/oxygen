import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { Result } from '../../models/result.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts().then((res: Result) => {
      // console.log(res.data);
      this.products = res.data;
    });
  }

}
