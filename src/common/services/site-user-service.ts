import { ISiteUserService } from "../abstract-types";
import { SiteUser, Site, UserTag } from "../types";

export default class SiteUserService implements ISiteUserService {
    getAll: () => SiteUser[];   
    get: (site?: Site, tags?: UserTag[]) => SiteUser[];
}