import { ISiteUserService } from "../abstract-types";
import { SiteUser, Site, UserTag } from "../types";

export default class SiteUserService implements ISiteUserService {
    getAll: () => SiteUser[];   
    get: (site?: Site, tags?: UserTag[]) => SiteUser[];
    getOne = (username?: string, site?: Site, tags?: Array<UserTag>) : SiteUser => {
        if(username == "username2"){
            return { username: "username2", tags: [{ name: "twat", rules: []}] }
        }

        return undefined;
    };
}