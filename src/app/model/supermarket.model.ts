import { Image } from './image.model';
import { Type } from "./type.model";

export class SuperMarket {
    idSuperMarket! : number;
    nomSuperMarket? : string;
    localisationSuperMarket? : string;
    dateCreation? : Date ;
    type! : Type;
    image! : Image ;
    imageStr!:string;
    images!: Image[];
    }