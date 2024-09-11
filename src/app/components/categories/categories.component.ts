import { Subscription } from 'rxjs';
import { Icategory } from '../../core/interfaces/icategory';
import { IsubCategory } from '../../core/interfaces/isub-category';
import { SupCategoriesService } from '../../core/services/sup-categories.service';
import { CategoriesService } from './../../core/services/categories.service';
import { Component, inject } from '@angular/core';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _SupCategoriesService = inject(SupCategoriesService)

  allCategoriesList:Icategory[]=[]
  supCategoriesList:IsubCategory[]=[]

  mainName : string = ""
  categoryId: string = ""
  supCategoryId: string = ""
  getDest!:Subscription
  getSupDest!:Subscription
  getSpicificDest!:Subscription
  



  ngOnInit(): void {
   this.getDest = this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(  'categoreis' , res.data)
        this.allCategoriesList=res.data

      },

    })

}

displaySupCategories( catId:string , catName:string){

  this.mainName = catName ;

  this.categoryId = catId
 this.getSupDest = this._SupCategoriesService.getSupCategories().subscribe({
    next : (res) => {
      this.supCategoriesList = res.data;
      console.log ("allCat" , res.data)
      console.log ("id" , this.categoryId)
    

  }})


  this.getSpicificDest = this._CategoriesService.getSpecificCategories(this.categoryId).subscribe({
    next: (res)=>
    {
      console.log("categoryyyyyy" ,res.data._id)
      let idcc =res.data._id

      this._SupCategoriesService.getSpecificSupCategoriesOnCategory(idcc).subscribe({
        next : (res)=>{
          console.log("supCats" , res.data)
          this.supCategoriesList = res.data
        }
      })
    }
  })
}

ngOnDestroy(){
  this.getDest?.unsubscribe()
  this.getSpicificDest?.unsubscribe()
  this.getSupDest?.unsubscribe()
}


}

