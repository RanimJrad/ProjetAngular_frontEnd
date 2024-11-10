import { Component, OnInit } from '@angular/core';
import { SuperMarket } from '../model/supermarket.model';
import { SupermarketService } from '../supermarket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '../model/type.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-supermarket',
  templateUrl: './update-supermarket.component.html',
})
export class UpdateSupermarketComponent implements OnInit {
  currentSupermarket = new SuperMarket();
  types!: Type[];
  updatedTypeId!: number;
  myImage!: string;

  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private SupermarketService: SupermarketService,
    private router: Router
  ) {}

  /*ngOnInit() {
    this.SupermarketService.listetypes().subscribe((typ) => {
      this.types = typ;
      console.log(typ);
    });
  
    this.SupermarketService.consulter(
      this.activatedRoute.snapshot.params['id']
    ).subscribe((sup) => {
      this.currentSupermarket = sup;
      this.updatedTypeId = this.currentSupermarket.type.idtype;
  
      // Check if the image property is defined before accessing it
      if (this.currentSupermarket.image && this.currentSupermarket.image.idImage) {
        this.SupermarketService.loadImage(
          this.currentSupermarket.image.idImage
        ).subscribe((img: Image) => {
          this.myImage = 'data:' + img.type + ';base64,' + img.image;
        });
      }
    });
  }*/
  /*updateSupermarket() {
    this.currentSupermarket.type = this.types.find(
      (typ: any) => typ.idtype == this.updatedTypeId
    )!;
    this.SupermarketService.update(this.currentSupermarket).subscribe(
      (sup: any) => {
        this.router.navigate(['supermarket']);
      }
    );
  }*/

  ngOnInit(): void {
    this.SupermarketService.listetypes().subscribe((typs) => {
      this.types = typs;
    });
    this.SupermarketService.consulter(
      this.activatedRoute.snapshot.params['id']
    ).subscribe((prod) => {
      this.currentSupermarket = prod;
      this.updatedTypeId = prod.type.idtype;
    });
  }

  /*updateSupermarket() {
    this.currentSupermarket.type = this.types.find(
      (typ: any) => typ.idtype == this.updatedTypeId
    )!;

    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.SupermarketService.uploadImage(
        this.uploadedImage,
        this.uploadedImage.name
      ).subscribe((img: Image) => {
        this.currentSupermarket.image = img;
        this.SupermarketService.update(this.currentSupermarket).subscribe(
          (sup) => {
            this.router.navigate(['supermarket']);
          }
        );
      });
    } else {
      this.SupermarketService.update(this.currentSupermarket).subscribe(
        (sup) => {
          this.router.navigate(['supermarket']);
        }
      );
    }
  }*/

  updateSupermarket() {
    this.currentSupermarket.type = this.types.find(
      (typ) => typ.idtype == this.updatedTypeId
    )!;
    this.SupermarketService.update(this.currentSupermarket).subscribe(
      (prod) => {
        this.router.navigate(['supermarket']);
      }
    );
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  onAddImageSupermarket() {
    this.SupermarketService.uploadImageSup(
      this.uploadedImage,
      this.uploadedImage.name,
      this.currentSupermarket.idSuperMarket
    ).subscribe((img: Image) => {
      this.currentSupermarket.images.push(img);
    });
  }

  supprimerImage(img: Image){
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.SupermarketService.supprimerImage(img.idImage).subscribe(() => {
    //supprimer image du tableau currentProduit.images
    const index = this.currentSupermarket.images.indexOf(img, 0);
    if (index > -1) {
    this.currentSupermarket.images.splice(index, 1);
    }
    });
    }
}
