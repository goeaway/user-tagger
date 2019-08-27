import * as React from "react";
import { ISiteService, IStorageService, ISiteUserService } from "../../common/abstract-types";
import * as selector from "css-select";
import { getElementParent } from "../../common/utils/parent-element-indexer";
import { createPortal } from "react-dom";
import TagList from "../components/tag-list";

export interface ContentAppProps {
    siteService: ISiteService;
    siteUserService: ISiteUserService;
}

const ContentApp: React.FC<ContentAppProps> = ({ siteService, siteUserService }) => {
    // first thing to do is figure out if we're on a site that we support (either default (reddit, youtube, twitter, etc) or user defined)
    if(siteService.locationSupported()) {
        const currentSite = siteService.getCurrentSite();
        // if we are on one of those sites, we need to then load the users that have been tagged
        const allSiteUsers = siteUserService.get(currentSite);
        // we then need to utilise the query selector to find all the username elements on the page.
        const commentElements = document.querySelectorAll(currentSite.userIdentElementSelector);
        // if the username matches one set by the user already, the tags should be added to the element
        // every username element found will be given a button for the ext user to add tags
        for(let i = 0; i < commentElements.length; i++) {
            const commentElement = commentElements[i];
            const anchorElement = getElementParent(commentElement, currentSite.userIdentElementParentAnchorIndex);

            createPortal(
                <TagList />,
                anchorElement
            );
        }
        // an event handler should be set up 
    }

    return null;
}

export default ContentApp;