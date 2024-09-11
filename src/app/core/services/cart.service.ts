import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient :HttpClient  ) {}
myHeaders:any ={ token: localStorage.getItem('userToken') } 


  AdProducttoCart(id:string): Observable<any> {
    return this._HttpClient.post(  `${environment.baseUrl}/api/v1/cart`  ,{
      "productId": id
    } ,
   )

  }
  getProductCart(): Observable<any> {
    return this._HttpClient.get( ` ${environment.baseUrl}/api/v1/cart`,  
   )

  }
  
  deleteProductCart(id:string): Observable<any> {
    return this._HttpClient.delete( ` ${environment.baseUrl}/api/v1/cart/${id}`,  
   )

  }


  updateProductCart(id:string, newcount:number): Observable<any> {
    return this._HttpClient.put( ` ${environment.baseUrl}/api/v1/cart/${id}`,
      { 
        "count":newcount
      
      }
        ,
          )

  }
  clearProductCart(): Observable<any> {
    return this._HttpClient.delete(  `${environment.baseUrl}/api/v1/cart`,
    
          )

  }


}