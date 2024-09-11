import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

import { Router, RouterLink } from '@angular/router';
import { Icart } from '../../core/interfaces/icart';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

private readonly _Router =inject(Router)
private readonly _CartService=inject(CartService)
private readonly _ToastrService=inject(ToastrService)

cartDetails: Icart|null = null;

productDest!:Subscription
dellDest!:Subscription
updateDest!:Subscription
clearDest!:Subscription



  ngOnInit(): void {
    

   this.productDest = this._CartService.getProductCart().subscribe({

      next:(res)=>{
        console.log(res.data) //{total cart price ,products[{}] }
       this.cartDetails=res.data
       

       
      },

    })
  }


  removeItem(id:string):void{
  this.dellDest =  this._CartService.deleteProductCart(id).subscribe({
      next:(res)=>{
        console.log(res) 
       this.cartDetails=res.data
       this._ToastrService.warning("Item removed 😥", 'Fresh Cart')
      },

    })
  }

  updareCart(id:string , count:number):void{
    if (count>0) {
     this.updateDest = this._CartService.updateProductCart(id,count).subscribe({
        next:(res)=>{
          console.log(res) 
         this.cartDetails=res.data
        },

      })
    }
  }

clearCart():void{
 this.clearDest = this._CartService.clearProductCart().subscribe({
  next:(res)=>{
    console.log(res) 
   this.cartDetails=null;
   this._Router.navigate(['/home'])
   


  },

})

}

ngOnDestroy(){
  this.dellDest?.unsubscribe()
  this.updateDest?.unsubscribe()
  this.clearDest?.unsubscribe()
  this.productDest?.unsubscribe()
}





}