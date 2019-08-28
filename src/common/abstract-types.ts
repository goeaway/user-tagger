import { Site, SiteUser, UserTag } from "./types";

/**
 * Service providing information and data about supported sites
 */
export interface ISiteService {
    /**
     * Returns a boolean value representing if the current site the active tab is on is supported by the app, either by default sites or user defined ones
     */
    locationSupported: () => boolean;
    /**
     * Gets the CommentPage representation of the active tab's current location, returns undefined if the current page is not supported
     */
    getCurrentSite: () => Site;
}

export interface IStorageService {
    get: (key: string) => {};
    set: (key: string, value: any) => void;
}

export interface ISiteUserService {
    getAll: () => Array<SiteUser>;
    /**
     * Gets all users matching the site (if specified) and tag list (if specified). If multiple tags are specified only users matching all tags are returned
     */
    get: (site?: Site, tags?: Array<UserTag>) => Array<SiteUser>;
    /**
     * Gets the first user that matches the username, site or tags in the list. Returns undefined if no users were found
     */
    getOne: (username?: string, site?: Site, tags?: Array<UserTag>) => SiteUser;
}

export interface IUsernameExtractionService {
    extract: (elementHTML: string) => string;
}