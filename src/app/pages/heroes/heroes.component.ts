import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';
import { HeroesService } from '../../servicios/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;
  constructor(private servicio: HeroesService) { 

  }

  ngOnInit() {
    this.cargando = true;
    this.servicio.getHeroes()
    .subscribe( (resp: any) => {
      
      this.heroes = resp;
      this.cargando = false;
      
    });
    
  }
  borrarHeroe(heroe: HeroeModel, i: number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then(resp =>{
      if(resp.value){
        this.heroes.splice(i, 1);
        this.servicio.borrarHeroe(heroe.id).subscribe();
        
      }
    })
   
   
  }
}
