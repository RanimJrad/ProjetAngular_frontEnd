import { Component, OnInit } from '@angular/core';
import { SuperMarket } from '../model/supermarket.model';
import { SupermarketService } from '../supermarket.service';
import { Router } from '@angular/router';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent {
  newSupermarket = new SuperMarket();
  types!: Type[];
  newIdtype!: number;
  newtype!: Type;

  constructor(
    private SupermarketService: SupermarketService,
    private router: Router
  ) {}

  ngOnInit() : void {
    this.SupermarketService.listetypes().subscribe((typs) => {
      console.log(typs);
      this.types = typs;
      
    });
  }

  add() {
    this.newSupermarket.type = this.types.find((typ) => typ.idtype == this.newIdtype)!;
    //this.newSupermarket.type = this.types.find(typ => typ.idtype == this.newIdtype)!;
    this.SupermarketService.ajouter(this.newSupermarket).subscribe((sup) => {
      console.log(sup);
      this.router.navigate(['supermarket']);
    });
  }
}
