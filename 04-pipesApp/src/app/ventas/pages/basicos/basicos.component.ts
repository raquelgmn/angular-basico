import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent {

  nombreLower: string = 'raquel';
  nombreUpper: string = 'RAQUEL';
  nombreCompleto: string = 'raQuel gaRCia';

  fecha: Date = new Date(); //el día de hoy
}
