import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ConvertToSpacesPipe,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard], 
        component: ProductDetailComponent
      }
    ]),
    SharedModule
  ]
})
export class ProductModule { }
