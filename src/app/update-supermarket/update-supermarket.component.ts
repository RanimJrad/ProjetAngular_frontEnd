import { Component, OnInit } from '@angular/core';
import { SuperMarket } from '../model/supermarket.model';
import { SupermarketService } from '../supermarket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-update-supermarket',
  templateUrl: './update-supermarket.component.html',
})
export class UpdateSupermarketComponent implements OnInit {
  currentSupermarket = new SuperMarket();
  types!: Type[];
  updatedTypeId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private SupermarketService: SupermarketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.SupermarketService.listetypes().subscribe(typ => {
      this.types = typ;
      console.log(typ);
    });

    this.SupermarketService.consulter(
      this.activatedRoute.snapshot.params['id']
    ).subscribe((sup) => {
      this.currentSupermarket = sup;
      this.updatedTypeId = this.currentSupermarket.type.idtype;
    });
  }
  updateSupermarket() {
    this.currentSupermarket.type = this.types.find(
      (typ:any) => typ.idtype == this.updatedTypeId
    )!;
    this.SupermarketService.update(this.currentSupermarket).subscribe(
      (sup: any) => {
        this.router.navigate(['supermarket']);
      }
    );
  }
}
