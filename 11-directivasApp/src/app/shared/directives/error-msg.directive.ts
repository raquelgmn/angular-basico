import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit, OnChanges{

  private _color: string = 'red';
  private _mensaje: string = 'Este campo es requerido';

  htmlelement: ElementRef<HTMLElement>;
  @Input() set color( valor: string){
    this._color = valor;
    this.setColor();
  }

  @Input() set mensaje( valor: string) {
    this._mensaje = valor;
    this.setMensaje();
  }

  @Input() set valido( valor: boolean) {
    if( valor ){
      this.htmlelement.nativeElement.classList.add('hidden');
    } else {
      this.htmlelement.nativeElement.classList.remove('hidden');
    }
  }

  constructor( private el: ElementRef<HTMLElement>) {
    this.htmlelement = el;
  }

   ngOnInit(): void {

     this.setColor();
     this.setMensaje();

   }

   setEstilo(): void{
     this.htmlelement.nativeElement.classList.add('form-text');
   }

   setColor(): void{
     this.htmlelement.nativeElement.style.color = this._color;
     this.htmlelement.nativeElement.classList.add('form-text');
   }

   setMensaje(): void{
     this.htmlelement.nativeElement.innerText = this._mensaje;
   }

   ngOnChanges(changes: SimpleChanges): void {
     
    // if(  changes['mensaje'] )
    // {
    //   const mensaje = changes['mensaje'].currentValue;
    //   this.htmlelement.nativeElement.innerText = mensaje;
    // }
    
    // if(  changes['color'] )
    // {
    //   const color = changes['color'].currentValue;
    //   this.htmlelement.nativeElement.style.color = this.color;
    //   this.htmlelement.nativeElement.classList.add('form-text');
    // }



   }
}
