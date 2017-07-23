import { S3File } from './S3File';
import { Role } from './Role';
import { Permission } from './Permission';

export class Subject{
    id:String;
    authToken:String;
    pushToken:String;
    emailAddress:String;
    firstName:String;
    lastName:String;
    creationDate:Date;
    picture:S3File;
    subjectRoles:Role[];
    subjectPermissions:Permission[];
    profile:String;
    social:String;
    company:String;


    constructor(){
        
    }

    
}