import { inject, Injectable } from '@angular/core';
import { WishListService } from './wish.service';
import { Iproducts } from '../interfaces/iwish';

@Injectable({
  providedIn: 'root'
})
export class ColorHeartService {


  private readonly _WishListService = inject(WishListService)

  wishlistDetails:Iproducts[]=[];
  check:boolean = false ;


  changeColor(ID:string){
   this._WishListService.userWishlist().subscribe({
    next:(res)=>{
      console.log(res);
    this.wishlistDetails=res.data
    console.log('wish list details',this.wishlistDetails);

          let foundItem =  this.wishlistDetails.find(item => item._id === ID);
        if (foundItem?._id === ID){
          this.check = true
        }
    console.log(  'is found?',foundItem)
    console.log(  'is found?',this.check)


    
    

    
      
    },


  })
  }
}
