import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish.service';
import { Iproducts } from '../../core/interfaces/iwish';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
private readonly _WishListService=inject(WishListService)
private readonly _CartService=inject(CartService)
private readonly _ToastrService=inject(ToastrService)

wishlistDetails:Iproducts[]=[]


wishDest!:Subscription
dellDest!:Subscription
addDest!:Subscription



ngOnInit(): void {
   this.wishDest = this._WishListService.userWishlist().subscribe({
      next:(res)=>{
        console.log(res);
      this.wishlistDetails=res.data
      console.log('wish list details',this.wishlistDetails);

      
        
      },

    })
}


deleteProduct(id:string):void{
 this.dellDest = this._WishListService.deleteproduct(id).subscribe({
    next:(res)=>{
this.ngOnInit()
      console.log(res);
    },

  })
}
addToCart(id:string):void{
 this.addDest= this._CartService.AdProducttoCart(id).subscribe({
    next:(res)=>{
      this._ToastrService.success(`${res.message} 😎` , 'Fresh Cart')

      console.log(res);     
    },

  })
}

ngOnDestroy(){
  this.dellDest?.unsubscribe()
  this.addDest?.unsubscribe()
  this.wishDest?.unsubscribe()
  
}
}