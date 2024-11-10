import { Injectable } from '@angular/core';
import { SuperMarket } from './model/supermarket.model';
import { Type } from './model/type.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TypeWrapper } from './model/typeWrapped.model';
import { Image } from './model/image.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SupermarketService {
  //Supermarket: SuperMarket[];
  //super!: SuperMarket;
  types!: Type[];

  apiURL: string = 'http://localhost:8081/SuperMarket/api';
  apiURLType: string = 'http://localhost:8081/SuperMarket/api/Type';

  constructor(private http: HttpClient, private authService: AuthService) {
    /*this.types = [
      { idtype: 1, nomtype: 'hypermarche' },
      { idtype: 2, nomtype: 'supermarche' },
      { idtype: 3, nomtype: 'superette' },
    ];

    this.Supermarket = [
      {
        idSuperMarket: 1,
        nomSuperMarket: 'Carrefour',
        localisationSuperMarket: 'Avenue Habib Thameur,Nabeul',
        dateCreation: new Date('01/14/2011'),
        type: { idtype: 1, nomtype: 'hypermarche' },
      },
      {
        idSuperMarket: 2,
        nomSuperMarket: 'Monoprix',
        localisationSuperMarket: ' Avenue Habib Bourguiba,Nabeul',
        dateCreation: new Date('12/17/2010'),
        type: { idtype: 2, nomtype: 'supermarche' },
      },
      {
        idSuperMarket: 3,
        nomSuperMarket: 'Mg',
        localisationSuperMarket: 'Rue Ali Belhouane,Nabeul',
        dateCreation: new Date('02/20/2020'),
        type: { idtype: 2, nomtype: 'supermarche' },
      },
    ];*/
  }

  listeSupermarkets(): Observable<SuperMarket[]> {
    return this.http.get<SuperMarket[]>(this.apiURL + '/all');
  }

  ajouter(sup: SuperMarket): Observable<SuperMarket> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<SuperMarket>(this.apiURL + '/addsupermarket', sup, {
      headers: httpHeaders,
    });
  }

  supprimer(id: number) {
    const url = `${this.apiURL}/deletesupermarket/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulter(id: number): Observable<SuperMarket> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<SuperMarket>(url, { headers: httpHeaders });
  }

  update(s: SuperMarket): Observable<SuperMarket> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.put<SuperMarket>(this.apiURL + '/updatesupermarket', s, {
      headers: httpHeaders,
    });
  }

  listetypes(): Observable<Type[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Type[]>(this.apiURLType, {
      headers: httpHeaders,
    });
  }

  /*trier() {
    this.Supermarket = this.Supermarket.sort((n1, n2) => {
      if (n1.idSuperMarket! > n2.idSuperMarket!) {
        return 1;
      }
      if (n1.idSuperMarket! < n2.idSuperMarket!) {
        return -1;
      }
      return 0;
    });
  }*/

  consultertype(id: number): Type {
    return this.types.find((type) => type.idtype == id)!;
  }

  rechercherParNom(nom: string): Observable<SuperMarket[]> {
    const url = `${this.apiURL}/supersByName/${nom}`;
    return this.http.get<SuperMarket[]>(url);
  }

  rechercheParType(idTyp: number): Observable<SuperMarket[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.apiURL}/suptype/${idTyp}`;
    return this.http.get<SuperMarket[]>(url, {
      headers: httpHeaders,
    });
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  ajouterType(typ: Type): Observable<Type> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Type>(this.apiURLType + '/addtype', typ, {
      headers: httpHeaders,
    });
  }

  uploadImageSup(
    file: File,
    filename: string,
    idSuperMarket: number
  ): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uplaodImageSup'}/${idSuperMarket}`;
    return this.http.post(url, imageFormData);
  }

  supprimerImage(id: number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }

  uploadImageFS(file: File, filename: string, idSuperMarket: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadFS'}/${idSuperMarket}`;
    return this.http.post(url, imageFormData);
  }
}
