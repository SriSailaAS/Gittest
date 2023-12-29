import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';
import { Observable, lastValueFrom, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  getDishes(): Observable<Dish[]> {
    const dishes$ = of(DISHES).pipe(delay(2000));
    return dishes$;
  }
  getDish(id:string):Observable<Dish>{
    const dish$=of(DISHES.filter((dish)=>(dish.id==id))[0]).pipe(delay(2000));
    return dish$;
  }
  getFeaturedDish():Observable<Dish>{
    const dish$=of(DISHES.filter((dish)=>dish.featured)[0]).pipe(delay(2000));
    return dish$;
  }
  getDishIds():Observable<string[] | any>{
    const dishid$=of(DISHES.map(dish=>dish.id));
    return dishid$;
  }
}
