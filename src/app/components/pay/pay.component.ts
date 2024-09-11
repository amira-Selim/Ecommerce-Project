import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [ReactiveFormsModule ,NgClass],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})

export class PayComponent {

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)
  private readonly _ToastrService = inject(ToastrService)

  cartId : string|null = "";
  saveDest!:Subscription
  checkDest!:Subscription


  orders: FormGroup = new FormGroup({

    details: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)])

  }, )


  ngOnInit(): void {
     this.saveDest = this._ActivatedRoute.paramMap.subscribe({
        next:(param)=>{
          this.cartId = param.get('id')
        }
      })
    
  }


  ordersSupmet(){
    console.log('orders form group' , this.orders.value)

  this.checkDest =  this._OrdersService.checkOut(this.cartId,this.orders.value).subscribe({
      next:(res)=>{
        console.log(res)
        this._ToastrService.success('Information add successfully' , 'Fresh Cart')
      if (res.status ==='success'){
        // res.session.url;
        window.open(res.session.url , '_self')
      }

      }
    })
  }
  ngOnDestroy(){
    this.saveDest?.unsubscribe()
    this.checkDest?.unsubscribe()
  }


}
