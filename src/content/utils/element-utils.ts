import * as React from "react";

export const elementContainsElement = (element1: any, element2: any) : boolean => {
    if(element1.contains(element2)) {
       return true; 
    }

    if(element1.childNodes && element1.childNodes.length > 0) {
        for(let i = 0; i < element1.childNodes.length; i++) {
            if(elementContainsElement(element1.childNodes[i], element2)){
                return true;
            }
        }
    }

    return false;
}