import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    
    pageTitle: string = 'Product List!';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub: Subscription | undefined;

    private _listFilter: string = '';
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.performFilter(value);
      console.log('filteredProducts: '+this.filteredProducts)
    }

    filteredProducts:IProduct[] = [];
    products: IProduct[] = [];

    constructor(private productService: ProductService){}

    performFilter(filterBy: string) : IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().includes(filterBy)
      );
    }

    onRatingClicked(message: string) {
        this.pageTitle = 'Product List: '+message;
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      this.sub = this.productService.getProducts().subscribe({
        next: products => { 
          this.products = products,
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });
    }

    ngOnDestroy(): void {
      this.sub?.unsubscribe;
    }
   
}