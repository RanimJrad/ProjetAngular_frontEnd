import { Component, OnInit } from '@angular/core';
import { SuperMarket } from '../model/supermarket.model';
import { SupermarketService } from '../supermarket.service';
import { AuthService } from '../auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-supermarket',
  templateUrl: './supermarket.component.html',
  styleUrls: ['./supermarket.component.css'],
})
export class SupermarketComponent implements OnInit {
  Supermarket: SuperMarket[] = [];

  apiurl:string='http://localhost:8081/SuperMarket/api';

  constructor(
    private SupermarketService: SupermarketService,
    public authService: AuthService
  ) {
    //this.Supermarket = SupermarketService.listeSupermarkets();
  }
  ngOnInit(): void {
    this.SupermarketService.listeSupermarkets().subscribe((supers) => {
      console.log(supers);
      this.Supermarket = supers;
    });

    this.chargerSupermarkets();
  }

  

  supprimerSupermarket(s: SuperMarket) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.SupermarketService.supprimer(s.idSuperMarket).subscribe(() => {
        console.log('supermarket supprimé');
        this.chargerSupermarkets();
      });
  }
  /*chargerSupermarkets() {
    this.SupermarketService.listeSupermarkets().subscribe((sup) => {
      this.Supermarket = sup;
      this.Supermarket.forEach((sups) => {

       this.Supermarket.forEach((sup) => {
          sup.imageStr = 'data:' + sup.images[0].type + ';base64,' +  sup.images[0].image;
          });
        
      });
    });
  }*/
    chargerSupermarkets(){
      this.SupermarketService.listeSupermarkets().subscribe(sups => {
      this.Supermarket = sups;
      });
      }

 
}
