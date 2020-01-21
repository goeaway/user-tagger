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

export const buildElementSelector = (element: any) => {
    return `${element.nodeName.toLowerCase()}${(element.id ? '#' + element.id : "")}${(element.classList && element.classList.length > 0 ? "." + [].slice.call(element.classList).join(".") : "")}`;
}

export const elementContainsElementWithSelector = (element: any, elementSelector: string) : boolean => {
    if(buildElementSelector(element) === elementSelector) {
        return true;
    }

    if(element.childNodes && element.childNodes.length > 0) {
        for(let i = 0; i < element.childNodes.length; i++) {
            if(elementContainsElementWithSelector(element.childNodes[i], elementSelector)) {
                return true;
            }
        }
    }

    return false;
}

export const elementIsInViewport = (element: Element) : boolean => {
    // add some pixels for leeway so we aren't rendering things AFTER they appear on the screen
    const buffer = 30;
    const boundRect = element.getBoundingClientRect();
    return (boundRect.top + buffer) >= 0 && 
        (boundRect.left + buffer) >= 0 && 
        (boundRect.left - buffer) <= (window.innerWidth || document.documentElement.clientWidth) &&
        (boundRect.top - buffer) <= (window.innerHeight || document.documentElement.clientHeight);
}

export const elementHasUserTagger = (element: any) : boolean => {
    return elementContainsElementWithSelector(element, "div.user-tagger__tag-list");
}

export const getElementsInViewport = (querySelector: string) : Array<Element> => {
    return ([].slice.call(document.querySelectorAll(querySelector)) as Array<Element>).filter(elementIsInViewport);
}

export const getElementsNotInViewport = (querySelector: string) : Array<Element> => {
    return ([].slice.call(document.querySelectorAll(querySelector)) as Array<Element>).filter(e => !elementIsInViewport(e));
}

export const getElementsWithUserTagger = (querySelector: string) : Array<Element> => {
    return ([].slice.call(document.querySelectorAll(querySelector)) as Array<Element>).filter(elementHasUserTagger);
}

export const getElementsWithoutUserTagger = (querySelector: string) : Array<Element> => {
    return ([].slice.call(document.querySelectorAll(querySelector)) as Array<Element>).filter(e => !elementHasUserTagger(e));
}

export const refIsInBottomHalfOfViewport = (ref: React.MutableRefObject<any>) => {

}

export const refIsInRightHalfOfViewport = (ref: React.MutableRefObject<any>) => {
    
}