import { IBrands } from './../../core/interfaces/ibrands';
import { Iproduct } from './../../core/interfaces/iproduct';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish.service';
import { ToastrService } from 'ngx-toastr';
import { Iproducts } from '../../core/interfaces/iwish';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule , NgStyle ,NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {


  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _WishService = inject(WishListService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishListService = inject(WishListService)

  detailsProduct: Iproduct | null = null;

  DetailsImages: string[] = [];
  Idproduct: string | null='' 
wishlistDetails:Iproducts[]=[];
check:boolean = false;


  forDestroy!: Subscription;
  routDest!: Subscription;
  wishDest!: Subscription;
  addWishDest!: Subscription;
  cartDest!: Subscription;


  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navSpeed: 700,
    // navText: ,/
    items: 1,
    nav: false
  }



  ngOnInit(): void {

    this.routDest =  this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get("id"))
        this.Idproduct  = p.get("id")

        this.forDestroy = this._ProductsService.getSpecificProducts(this.Idproduct).subscribe({
          next: (res) => {
            console.log(res.data)
            this.detailsProduct = res.data;
            if (this.detailsProduct) {
              this.DetailsImages = this.detailsProduct.images;
            }
          },

        })


      }
    })


   this.wishDest = this._WishListService.userWishlist().subscribe({
      next:(res)=>{
        console.log(res);
      this.wishlistDetails=res.data
      console.log('wish list details',this.wishlistDetails);

      
            let foundItem =  this.wishlistDetails.find(item => item._id === this.Idproduct);
          if (foundItem?._id === this.Idproduct){
            this.check = true
          }
      console.log(  'is found?',foundItem)
      console.log(  'is found?',this.check)


      
      

      
        
      },


    })
  }



  addCart(): void {
    // this._ActivatedRoute.paramMap.subscribe({
    //   next: (res) => {
    //     console.log(res.get("id"))
    //     let Idproduct = res.get("id")



    //   }
    // })
    this.cartDest = this._CartService.AdProducttoCart(this.Idproduct!).subscribe({
      next: (res) => {
        console.log(res)
        
        this._ToastrService.success(`${res.message} 😎`, "Fresh Cart")

      },
    })

  }

  addToWish(): void {



    this.addWishDest = this._WishService.addToWishlist(this.Idproduct!).subscribe({
      next: (res) => {
        console.log(res)
        this._ToastrService.info(`${res.message} 👍`, "Fresh Cart")

      },

    })

  }



  ngOnDestroy(): void {
    this.forDestroy?.unsubscribe();
    this.addWishDest?.unsubscribe();
    this.wishDest?.unsubscribe();
    this.cartDest?.unsubscribe();
    this.routDest?.unsubscribe();
  }



}
