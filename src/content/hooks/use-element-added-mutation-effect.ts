import * as React from "react";
import { elementContainsElementWithSelector } from "../utils/element-utils";

const useElementAddedMutationEffect = (observedElement: Element, mutationElementSelector: string, onDesiredMutation: () => void, watchArray?: Array<any>) => {
    React.useEffect(() => {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                for(let i = 0; i < mutation.addedNodes.length; i++) {
                    const addedNode = mutation.addedNodes[i];
                    // if the addedNode contains the currentSite.userIdentElementSelector we need to rerender
                    if (elementContainsElementWithSelector(addedNode, mutationElementSelector)) {
                        // setRerender(v1());
                        onDesiredMutation();
                        return;
                    }
                }
            })
        });
        
        var config = { attributes: true, childList: true, characterData: true };
        
        observer.observe(observedElement, config);

        return () => observer.disconnect();
    }, watchArray || []);
}

export default useElementAddedMutationEffect;