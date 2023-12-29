import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';
import { Observable, delay, lastValueFrom, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
   getPromotions():Observable<Promotion[]> {
    const promotions$ = of(PROMOTIONS).pipe(delay(2000));
    return promotions$;
  }
  getPromotion(id:string):Observable<Promotion>{
    const promotion$ = of(PROMOTIONS.filter((promo)=>(promo.id==id))[0]).pipe(delay(2000));
    return promotion$;
  }
  getFeaturedPromotion():Observable<Promotion>{
    const promotion$ = of(PROMOTIONS.filter((promo)=>promo.featured)[0]).pipe(delay(2000));
    return promotion$;
  }
}
