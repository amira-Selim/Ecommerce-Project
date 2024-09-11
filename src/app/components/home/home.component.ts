import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../core/services/products.service';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TeretextPipe } from '../../core/pipes/teretext.pipe';
import { CartService } from '../../core/services/cart.service';

import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish.service';
import { Iproducts } from '../../core/interfaces/iwish';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, TeretextPipe, FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {


  searchTerm: string = "";

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _WishListService = inject(WishListService)
  private readonly _ToastrService = inject(ToastrService)


  productList: Iproduct[] = []
  categoriesList: Icategory[] = []
  getAllProductDest!: Subscription;
  getAllCatDest!: Subscription;
  addCartDest!: Subscription;
  addWishDest!: Subscription;
  productId!: string;
wishlistDetails:Iproducts[]=[];
check:boolean = false;
items:string = '';






  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: false,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }


  customOptionscat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }




  ngOnInit(): void {
    this.getAllCatDest = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data)
        this.categoriesList = res.data
        console.log(this.categoriesList)

      },

    })
    this.getAllProductDest = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data)
        this.productList = res.data;








      },

    })
 



  }


  addCart(id: string): void {

  this.addCartDest =  this._CartService.AdProducttoCart(id).subscribe({
      next: (res) => {
        console.log(res)
        // this._ToastrService.success(res.message,"Fresh Cart")
        this._ToastrService.success(`${res.message} 😎`, "Fresh Cart")

      },

    })

    

    
  }

  addToWish(id: string): void {

   this.addWishDest =  this._WishListService.addToWishlist(id).subscribe({
      next: (res) => {
        console.log(res)
        this._ToastrService.info(`${res.message} 👍` , 'Fresc Cart')
        
      },

    })

  }
  ngOnDestroy(): void {
    this.getAllProductDest?.unsubscribe()
    this.getAllCatDest?.unsubscribe()
    this.addCartDest?.unsubscribe()
    this.addWishDest?.unsubscribe()
  }

}