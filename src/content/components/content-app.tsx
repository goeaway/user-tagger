import * as React from "react";
import { ISiteService, IStorageService, ISiteUserService } from "../../common/abstract-types";

export interface ContentAppProps {
    siteService: ISiteService;
    siteUserService: ISiteUserService;
}

const ContentApp: React.FC<ContentAppProps> = ({ siteService, siteUserService }) => {
    // first thing to do is figure out if we're on a site that we support (either by default (reddit, youtube, twitter, etc) or user defined)
    if(siteService.locationSupported()) {
        // if we are on one of those sites, we need to then load the users that have been tagged
        const allSiteUsers = siteUserService.get(siteService.getSiteCommentPage());
        // we then need to utilise the query selector to find all the username elements on the page.
        // if the username matches one set by the user already, the tags should be added to the element
        // every username element found will be given a button for the ext user to add tags
        
        // an event handler should be set up 
    }

    return null;
}

export default ContentApp;