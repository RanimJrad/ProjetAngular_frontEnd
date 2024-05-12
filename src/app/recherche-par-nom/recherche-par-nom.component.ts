import { Component, OnInit } from '@angular/core';
import { SuperMarket } from '../model/supermarket.model';
import { SupermarketService } from '../supermarket.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent {

  searchTerm!: string;
  Supermarket! : SuperMarket[];
  nomSupermarket! : string;
  allSupermarkets! : SuperMarket[];
  

  constructor(private supermarketService : SupermarketService){}

  ngOnInit(){
    this.supermarketService.listeSupermarkets().subscribe(sups => {
      console.log(sups);
      this.Supermarket = sups;
      });
  }

  onKeyUp(filterText : string){
    this.Supermarket = this.allSupermarkets.filter(item =>
    item.nomSuperMarket!.toLowerCase().includes(filterText));
    }

  rechercherSupers(){
    this.supermarketService.rechercherParNom(this.nomSupermarket).
subscribe(sup => {
this.Supermarket = sup;
console.log(sup)});

  }

}