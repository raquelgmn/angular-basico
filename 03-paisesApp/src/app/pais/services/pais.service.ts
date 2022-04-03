import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})

export class PaisService {

  constructor( private http: HttpClient ) { }

  private apiUrl: string = 'https://restcountries.com/v3.1';

  get httParams( ){
    return new HttpParams().set( 'fields', 'name,capital,flags,population,cca2,ccn3' );
  }

  buscarPais ( termino: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/name/${ termino }`;

    return this.http.get<Country[]>( url, { params: this.httParams } );
  }

  buscarCapital ( termino: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/capital/${ termino }`;

    return this.http.get<Country[]>( url, { params: this.httParams } );
  }

  getPaisPorAlpha ( id: string ): Observable<Country> {

    const url = `${ this.apiUrl }/alpha/${ id }`;

    return this.http.get<Country>( url );
  }

  buscarRegion ( region: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/region/${ region }?`;

    return this.http.get<Country[]>( url, { params: this.httParams } )
            .pipe(
              tap(console.log)
            );
  }
}
