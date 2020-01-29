import { IUserTaggerAPI, ISiteService } from "../abstract-types";
import { getElementParent } from "../utils/parent-element-indexer";

export default class UserTaggerAPI implements IUserTaggerAPI {
    private _siteService: ISiteService;

    constructor(siteService: ISiteService) {
        this._siteService = siteService;
    }

    private highlightElement = (element: Element) => {
        const previousStyle = element.getAttribute("style");
        element.setAttribute("style", "background: yellow");
    
        setTimeout(() => {
            element.setAttribute("style", previousStyle);
        }, 5000);
    }

    highlightCommentSection = () => {
        const site = this._siteService.getCurrentSite();

        if(this._siteService.locationSupported()) {
            const commentsContainer = document.querySelector(site.commentSectionContainer);
            this.highlightElement(commentsContainer);
        }
    }

    highlightComment = (index: number) => {
        const site = this._siteService.getCurrentSite();

        if(this._siteService.locationSupported()) {
            const comments = document.querySelectorAll(site.userIdentElementSelector);

            if(comments.length > index) {
                const userIdentElement = comments.item(index);
                const commentContainer = getElementParent(userIdentElement, site.userIdentElementParentBlockIndex);

                this.highlightElement(commentContainer);
            }
        }
    }
}