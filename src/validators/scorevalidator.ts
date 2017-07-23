import { FormControl } from '@angular/forms';
 
export class ScoreValidator {
 
    static isValid(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "Please enter a valid score": true
            };
        }
 
        if(control.value % 1 !== 0){
            return {
                "score must be whole number": true
            };
        }
 
        if(control.value < 0){
            return {
                "score cannot be less than 0": true
            };
        }
 
        if (control.value > 20){
            return {
                "score cannot be greater than 20": true
            };
        }

        if (control.value ===''){
            return {
                "please enter a valid score": true
            };
        }
 
        return null;
    }
 
}