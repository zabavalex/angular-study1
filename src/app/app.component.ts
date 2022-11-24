import {Component, OnInit} from '@angular/core';
import {IProduct} from "./models/product";
import {products, products as data} from "./data/product"
import {ProductService} from "./services/product.service";
import {Observable, tap} from "rxjs";
import {ModalService} from "./services/modal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-study'
  loading = false
  products$: Observable<IProduct[]>
  term = ''

  constructor(
    public productService: ProductService,
    public modalService: ModalService
    ) {
  }

  ngOnInit() {
    this.loading = true
    // this.products$ = this.productService.getAll().pipe(
    //   tap(() => this.loading = false)
    // )
    this.productService.getAll().subscribe(() => this.loading = false)
  }
}
