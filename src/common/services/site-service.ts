import { ISiteService, IStorageService } from "../abstract-types";
import { Site } from "../types";

export default class SiteService implements ISiteService {
    private _storageService: IStorageService;
    private _currentSite: Site;

    constructor(storageService: IStorageService) {
        this._storageService = storageService;
        
        // load from storage the user defined ones
        const pages: Array<Site> = []

        pages.push(
            { id: "yt", name: "YouTube", domain: "youtube.com", locationPattern: "/watch", userIdentElementSelector: "a#author-text" },
            { id: "ore", name: "Old Reddit", domain: "old.reddit.com", locationPattern: "/comments/", userIdentElementSelector: "a.author" },
            { id: "nre", name: "New Reddit", domain: "reddit.com", locationPattern: "/comments/", userIdentElementSelector: 'a[href^="/user/"]'}
        );

        const { host } = window.location;
        const { pathname } = window.location;

        for (let i = 0; i < pages.length; i++) {
            const p = pages[i];
            // sets the first one that matches the domain and is in the pathname
            // if multiple the first in the list is chosen
            if(p.domain === host && pathname.indexOf(p.locationPattern) > -1) {
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