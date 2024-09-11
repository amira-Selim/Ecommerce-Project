import { IBrands } from './../../core/interfaces/ibrands';
import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private readonly _BrandsService = inject(BrandsService)

  allBrands:IBrands [] = [] 
  Brand:object [] = [] 
  Id:string=''
  showDiv:boolean =false ;
allDest!:Subscription
sDest!:Subscription




  ngOnInit(){
   this.allDest = this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.allBrands =res.data
        console.log("allBrands", this.allBrands)
      }
    })
  }

  displaySpecificPrand(id:string){
    this.Id=id;
  this.sDest =  this._BrandsService.getSpecificBrand(this.Id).subscribe({
      next:(res)=>{
        this.Brand=res.data
        console.log('specificBrand' , this.Brand)

        
      }
    })

  }


  ngOnDestroy(){
    this.allDest?.unsubscribe()
    this.sDest?.unsubscribe()
  }

}
