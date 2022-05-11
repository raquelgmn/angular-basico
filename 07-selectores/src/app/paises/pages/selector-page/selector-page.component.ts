import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServiceService } from '../../services/paises-service.service';
import { PaisSmall } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required ],
    pais: ['', Validators.required ],
    frontera: [{ value:'', disabled: true}, Validators.required ],
  })


  // Llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  //fronteras: string[] = [];
  fronteras: PaisSmall[] = [];

  //UI
  cargando: boolean = false;

  constructor( private fb: FormBuilder,
               private paisesService: PaisesServiceService) { }

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones;

    // Cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe( region => {
    //     console.log(region)

    //     this.paisesService.getPaisesPorRegion( region )
    //       .subscribe ( paises => {
    //         this.paises = paises;
    //         console.log(paises)
    //       })
    //   })

    // Cuando cambia la región
    this.miFormulario.get('region')?.valueChanges
    .pipe(
        tap( region => {
          this.miFormulario.get('pais')?.reset('');
          this.miFormulario.get('frontera')?.disable();
          this.cargando = true;
        }),
        switchMap( region => this.paisesService.getPaisesPorRegion( region ) )
      )
      .subscribe( paises => {
        this.paises = paises;
        this.cargando = false;
      })

      // Cuando cambia el pais
      // this.miFormulario.get('pais')?.valueChanges
      // .pipe(
      //     switchMap( codigo => this.paisesService.getPaisPorCodigo( codigo ) )
      //   )
      //   .subscribe( pais => {
      //     console.log(pais?.cca3)
      //     this.fronteras = pais?.borders || [];
      //   })

      this.miFormulario.get('pais')?.valueChanges
        .pipe(
          tap( region => {
            this.fronteras = [];
            this.miFormulario.get('frontera')?.reset('');
            this.miFormulario.get('frontera')?.enable();
            this.cargando = true;
          }),
          switchMap( codigo => this.paisesService.getPaisPorCodigo( codigo )),
          switchMap( pais => this.paisesService.getPaisesPorCodigo( pais ? pais[0].borders : []))
        )
        .subscribe ( paises => {
          console.log(paises)
          // if(pais && pais[0]){
          //   this.fronteras = pais[0]?.borders || [];
          // }

          this.fronteras = Array.prototype.concat.apply([], paises); //flatten array of arrays
          console.log('Fronteras Final' + JSON.stringify(this.fronteras))
          this.cargando = false;

      })

  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
