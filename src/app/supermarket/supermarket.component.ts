import { Component, OnInit } from '@angular/core';
import { SuperMarket } from '../model/supermarket.model';
import { SupermarketService } from '../supermarket.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-supermarket',
  templateUrl: './supermarket.component.html',
  styleUrls: ['./supermarket.component.css'],
})
export class SupermarketComponent implements OnInit {
  Supermarket: SuperMarket[]=[];

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

  chargerSupermarkets(){
    this.SupermarketService.listeSupermarkets().subscribe(sup => {
    console.log(sup);
    this.Supermarket = sup;
    });
    }

  supprimerSupermarket(s: SuperMarket) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.SupermarketService.supprimer(s.idSuperMarket).subscribe(() => {
        console.log('supermarket supprimé');
        this.chargerSupermarkets();
      });
  }
}
