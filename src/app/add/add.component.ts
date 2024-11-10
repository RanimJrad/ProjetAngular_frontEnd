import { Image } from './../model/image.model';
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

  uploadedImage!: File;
  imagePath: any;

  constructor(
    private SupermarketService: SupermarketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.SupermarketService.listetypes().subscribe((typs) => {
      console.log(typs);
      this.types = typs;
    });
  }

  /*add() {
    this.newSupermarket.type = this.types.find((typ) => typ.idtype == this.newIdtype)!;
    //this.newSupermarket.type = this.types.find(typ => typ.idtype == this.newIdtype)!;
    this.SupermarketService.ajouter(this.newSupermarket).subscribe((sup) => {
      console.log(sup);
      this.router.navigate(['supermarket']);
    });
  }*/
  /*add() {
    this.SupermarketService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
    this.newSupermarket.image=img;

    this.newSupermarket.type = this.types.find(typ => typ.idtype == this.newIdtype)!;
    this.SupermarketService
    .ajouter(this.newSupermarket)
    .subscribe(() => {
    console.log(this.newSupermarket);
    console.log("image path "+this.imagePath);
    this.router.navigate(['supermarket']);
    });
    });
  }*/
  add() {
    this.newSupermarket.type = this.types.find(
      (typ) => typ.idtype == this.newIdtype
    )!;
    this.SupermarketService.ajouter(this.newSupermarket).subscribe((sup) => {
      this.SupermarketService.uploadImageFS(
        this.uploadedImage,
        this.uploadedImage.name,
        sup.idSuperMarket
      ).subscribe((response: any) => {});
      this.router.navigate(['supermarket']);
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
}
