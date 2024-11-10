import { Component, OnInit } from '@angular/core';
import { Type } from '../model/type.model';
import { SupermarketService } from '../supermarket.service';

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styleUrls: ['./liste-types.component.css'],
})
export class ListeTypesComponent implements OnInit {

  types!: Type[];
  updatedTyp:Type= {"idtype":0,"nomtype":""};

  ajout:boolean=true;
  constructor(private supermarketService: SupermarketService) {}
  ngOnInit(): void {
    this.supermarketService.listetypes().subscribe((typs) => {
      this.types = typs;
      console.log(typs);
    });
  }

  typeUpdated(typ:Type){
    
    this.supermarketService.ajouterType(typ).
    subscribe( ()=> this.chargerTypes());

  }

  chargerTypes(){
    this.supermarketService.listetypes().
    subscribe(typs => {this.types = typs;
    console.log(typs);
    });
    }

    updateTyp(typ:Type) {
      this.updatedTyp=typ;
      this.ajout=false;
      }

}
