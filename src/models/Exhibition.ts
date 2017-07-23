import { Company } from './Company';
import { Venue } from './Venue';
import { S3File } from './S3File';


export class Exhibition{

    id:String;
    company:Company;
    venue:Venue;
    video:S3File;

    

    constructor(){

    }

    
}