import { BrochureNav } from './BrochureNav';
import { S3File } from './S3File';


export class Brochure{

    id:string;
    name:string;
    source:S3File
    description:string;
    contents:BrochureNav[];
    existOnline:boolean;
    

    constructor(){

    }

    
}