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
    /**
     * Gets the first user that matches the username, site or tags in the list. Returns undefined if no users were found
     */
    getUser: (username?: string, site?: Site, tags?: Array<UserTag>) => SiteUser;
    getTagsNotFoundOnUser: (excludingUser?: SiteUser, search?: string) => Array<UserTag>;
    updateUserTags: (username: string, tags: Array<UserTag>) => void

}

export interface IUsernameExtractionService {
    extract: (elementHTML: string) => string;
}

export interface ITagService {
    getTags: () => Array<UserTag>;
}