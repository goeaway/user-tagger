import { ISiteUserService } from "../abstract-types";
import { SiteUser, Site, UserTag } from "../types";

export default class SiteUserService implements ISiteUserService {
    private _userStore: Array<SiteUser>;

    constructor() {
        this._userStore = [
            { username: "username2", tags: [{ name: "twat", rules: [], backgroundColor: "#000", color: "#fff"}] }
        ];
    }

    getUser = (username?: string, site?: Site, tags?: Array<UserTag>) : SiteUser => {
        const existing = this._userStore.find(u => u.username === username);

        // return the existing if it exists, otherwise return an empty user. Don't bother putting that empty one in the store
        // at the moment we don't need it there and it will be added if the app user decides to add a tag to it
        return existing || { username: username, tags: [] };
    };

    updateUserTags = (username: string, tags: Array<UserTag>) => {
        const userInStore = this._userStore.find(u => u.username === username);
        // update the tags on the existing item in the store
        // or create a new item in the store
        if(userInStore) {
            if(userInStore.tags) {
                userInStore.tags.concat(tags);
            } else {
                userInStore.tags = tags;
            }

        } else {
            this._userStore.push({ username, tags});
        }

        console.dir(this._userStore);
    }
}