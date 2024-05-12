import { Component, OnInit } from '@angular/core';
import { SuperMarket } from '../model/supermarket.model';
import { Type } from '../model/type.model';
import { SupermarketService } from '../supermarket.service';
import { SupermarketComponent } from '../supermarket/supermarket.component';

@Component({
  selector: 'app-recherche-par-type',
  templateUrl: './recherche-par-type.component.html',
})
export class RechercheParTypeComponent implements OnInit {
  idType!: number;
  Types: Type[]=[];
  Supermarket! : SuperMarket[];

  constructor(private supermarketService : SupermarketService ){}

  ngOnInit(): void {
    this.supermarketService.listetypes().
subscribe(typs => {this.Types = typs;
console.log(typs);
});
this.loadAllSupermarches();
  }
  private loadAllSupermarches(): void {
    this.supermarketService.listeSupermarkets().subscribe((sups) => {
      this.Supermarket = sups;
    });
  }

  
    onChange() {
      this.supermarketService.rechercheParType(this.idType).
      subscribe(sup =>{this.Supermarket=sup}); 
         }
  }

