import * as React from "react";
import useScrollEffect from "./use-scroll-effect";
import { getElementsInViewport, elementHasUserTagger, getElementsNotInViewport } from "../utils/element-utils";

const useElementScrolledInOrOutEffect = (elementSelector: string, onElementScrollInOrOut: () => void, watchArray?: Array<any>) => {
    useScrollEffect(e => {

        const elementsInViewport = getElementsInViewport(elementSelector);

        let shouldRerender = false;

        if(elementsInViewport) {
            elementsInViewport.forEach(e => {
                if(!elementHasUserTagger(e)) {
                    shouldRerender = true;
                    return;
                }
            });
        }

        if(!shouldRerender) {
            const elementsNotInViewport = getElementsNotInViewport(elementSelector);

            if(elementsNotInViewport) {
                elementsNotInViewport.forEach(e => {
                    if(elementHasUserTagger(e)) {
                        shouldRerender = true;
                        return;
                    }
                })
            }
        }

        if(shouldRerender) {
            onElementScrollInOrOut();
        }
    }, watchArray);
}

export default useElementScrolledInOrOutEffect;