import { ISiteService} from "../abstract-types";
import { Site } from "../types";

export default class SiteService implements ISiteService {
    private _currentSite: Site;

    constructor() {
        
        // load from storage the user defined ones
        const pages: Array<Site> = []

        pages.push(
            { 
                id: "ss", 
                name: "Simple Site", 
                domain: "localhost:8080", 
                locationPattern: "", 
                userIdentElementSelector: "div.comment__header__author", 
                userIdentElementParentAnchorIndex: 0, 
                userIdentElementParentBlockIndex: 2, 
                usernameExtractionRegex: undefined,
                commentSectionContainer: "div.comments"
            }
        );

        // pages.push(
        //     { id: "yt", name: "YouTube", domain: "youtube.com", locationPattern: "/watch", userIdentElementSelector: "a#author-text", userIdentElementParentAnchorIndex: 1, userIdentElementParentBlockIndex: 3 },
        //     { id: "ore", name: "Old Reddit", domain: "old.reddit.com", locationPattern: "/comments/", userIdentElementSelector: "a.author", userIdentElementParentAnchorIndex: 1, userIdentElementParentBlockIndex: 3 },
        //     { id: "nre", name: "New Reddit", domain: "reddit.com", locationPattern: "/comments/", userIdentElementSelector: 'a[href^="/user/"]', userIdentElementParentAnchorIndex: 1, userIdentElementParentBlockIndex: 3}
        // );

        const { host } = window.location;

        for (let i = 0; i < pages.length; i++) {
            const p = pages[i];
            // sets the first one that matches the domain and is in the pathname
            // if multiple the first in the list is chosen
            if(p.domain === host) {
                this._currentSite = p;
                break;
            }    
        }
    }

    locationSupported = () : boolean => {
        return this._currentSite !== undefined;
    }

    getCurrentSite = () : Site => {
        return this._currentSite;
    }
}