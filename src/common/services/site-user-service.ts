import { ISiteUserService, IStorageService } from "../abstract-types";
import { SiteUser, Site, UserTag, RGBExtensions } from "../types";
import * as uuid from "uuid";

export default class SiteUserService implements ISiteUserService {
    private LOCAL_STORAGE_SITE_USER_KEY = "user-tagger.saved-site-user";
    private _storageService: IStorageService;

    constructor(storageService: IStorageService) {
        this._storageService = storageService;
    }

    getUser = (username: string) : SiteUser => {
        const existing = this._storageService.get<SiteUser>(this.LOCAL_STORAGE_SITE_USER_KEY + "." + username);
        // return the existing if it exists, otherwise return an empty user. Don't bother putting that empty one in the store
        // at the moment we don't need it there and it will be added if the app user decides to add a tag to it
        return existing || { username: username, tags: [] };
    };

    getTagsNotFoundOnUser = (excludingUser?: SiteUser, search?: string) : Array<UserTag> => {
        let allTags: Array<UserTag> = [];

        // todo fix this so we can get all tags saved so far
        [].forEach(u => allTags = allTags.concat(u.tags));
        if(excludingUser) {
            allTags = allTags.filter(t => !excludingUser.tags.some(ex => ex.id === t.id));
        }

        if(search) {
            allTags = allTags.filter(t => t.name.indexOf(search) > -1)
        }

        return allTags;
    }

    setUser = (user: SiteUser) => {
        if(!user) {
            throw "user was null";
        }

        this._storageService.set(this.LOCAL_STORAGE_SITE_USER_KEY + "." + user.username, user);
    }
}