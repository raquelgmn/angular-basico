import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  constructor( private paisService: PaisService) { }

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  buscar( termino: string ){
    this.termino = termino;
    this.hayError = false;

    this.paisService.buscarCapital( this.termino )
      .subscribe( paises => {
        console.log(paises);

        this.paises = paises;
        
      }, (err) => {
        this.hayError = true;
        this.paises = [];
      });

  }

  sugerencias ( termino: string){
    this.hayError = false;
  }

}
