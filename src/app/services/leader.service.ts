import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { Observable, delay, lastValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Observable<Leader[]> {
    const leaders$ = of(LEADERS).pipe(delay(2000));
    return leaders$;
  }
   getLeader(id:string):Observable<Leader>{
    const leader$ = of(LEADERS.filter((leader)=>(leader.id==id))[0]).pipe(delay(2000));
    return leader$;
  }
  getFeaturedLeader():Observable<Leader>{
    const leader$ = of(LEADERS.filter((leader)=>leader.featured)[0]).pipe(delay(2000));
    return leader$;
  }
  
}
