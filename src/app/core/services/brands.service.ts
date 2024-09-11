import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private readonly _HttpClient =inject(HttpClient)

  brandId:string=''

  getAllBrands():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`)

  }
  getSpecificBrand(id:string):Observable<any>{
    this.brandId = id
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands/${this.brandId}`)
  }


}
