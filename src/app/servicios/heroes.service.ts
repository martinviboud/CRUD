import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private URL = 'https://crud-7306f-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) { }
  crearHeroe(heroe: HeroeModel){
    return this.http.post(`${this.URL}/heroes.json`, heroe  )
                .pipe(
                  map((resp: any) => {
                    heroe.id = resp.name;
                    console.log('agregado al Backend');
                  })
                );
  }
  actualizarHeroe(heroe: HeroeModel){
    const hereoTemporal = {
      ...heroe
    }
    delete hereoTemporal.id;
    return this.http.put(`${this.URL}/heroes/${heroe.id}.json`, hereoTemporal );
  }
  getHeroes(){
    return this.http.get(`${this.URL}/heroes.json`).pipe(
      map(data => this.crearArreglo(data)
      )
      );
    
  }
  borrarHeroe( id: string){
    return this.http.delete(`${this.URL}/heroes/${id}.json`);
  }
  getHeroe(id: string){
    return this.http.get(`${this.URL}/heroes/${id}.json`);
  }
  private crearArreglo( heroesObj: object ){
      const heroes: HeroeModel[] = [];
      if (heroesObj === null){ return []; }
      Object.keys (heroesObj).forEach(key => {
        const heroe: HeroeModel = heroesObj[key];
        heroe.id = key;
        heroes.push( heroe );
      });
      
      return heroes;
      
  }
}
