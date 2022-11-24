import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {IProduct} from "../models/product";
import {catchError, delay, Observable, retry, tap, throwError} from "rxjs";
import {ErrorService} from "./error.service";
import {products} from "../data/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: IProduct[] = []

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {
  }

  getAll(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>("https://fakestoreapi.com/products", {
      params: new HttpParams({
        fromString: 'limit=5'
      })
    }).pipe(
      delay(2000),
      retry(2),
      tap(products => this.products = products),
      catchError(this.errorHandler.bind(this))
    )
  }

  create(product: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>('https://fakestoreapi.com/products', product)
      .pipe(
        tap(newProduct => this.products.push(newProduct))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
