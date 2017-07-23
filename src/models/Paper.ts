import { Subject } from './Subject';
import { PaperGroup } from './PaperGroup';

export class Paper{

    id:String;
    paperCode:String;
    authors:Subject[];
    topic:String;
    paperAbstract:String;
    isWinner:Boolean;
    paperGroup:PaperGroup;
    score:Number;


    constructor(){

    }

    
}