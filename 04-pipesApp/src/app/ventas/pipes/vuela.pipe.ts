import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'vuela'
})
export class VuelaPipe implements PipeTransform {

    transform( valor: boolean ): string {
        // if( enMayusculas ){
        //     return valor.toUpperCase();
        // } else {
        //     return valor.toLocaleLowerCase();
        // }

        return (valor) ? 'vuela' : 'no vuela';
    }

}