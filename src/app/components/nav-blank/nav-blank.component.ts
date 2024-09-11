import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthApiService } from '../../core/services/auth.service';
import { WishListService } from '../../core/services/wish.service';
import { Iproducts } from '../../core/interfaces/iwish';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {

  readonly _AuthApiService = inject(AuthApiService)
  readonly _CartService = inject(CartService)

  items:string=''
  saveDest!:Subscription


  ngOnInit(){
    this._CartService.getProductCart().subscribe({
      next:(res)=>{
        console.log('navInIt wishList' , res)

        this.items = res.numOfCartItems
        console.log('navInIt wishList' , this.items)
      }
    })

    
  }

  ngOnDestroy(){
    this.saveDest?.unsubscribe()
  }

}
