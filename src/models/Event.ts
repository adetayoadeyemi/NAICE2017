import { Subject } from './Subject';
import { Venue } from './Venue';
import { Track } from './Track';

export class Event{

    id:String;
    name:String;
    startTimeValue:Date[];
    endTimeValue:Date[];
    description:String;
    speakers:Subject[];
    fav:number;
    interactive:boolean;
    venues:Venue[];
    tracks:Track[];


    constructor(){

    }

    
}