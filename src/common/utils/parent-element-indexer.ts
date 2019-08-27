export function getElementParent(element: Element, index: number) {
    if(index <= 0) {
        return element;
    }

    return getElementParent(element.parentElement, index - 1);
}