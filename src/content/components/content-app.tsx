import * as React from "react";
import { ISiteService, ISiteUserService, IUsernameExtractionService } from "../../common/abstract-types";
import { getElementParent } from "../../common/utils/parent-element-indexer";
import { createPortal, } from "react-dom";
import TagList from "../components/tag-list";
import "../styles/structure.less";

export interface ContentAppProps {
    siteService: ISiteService;
    siteUserService: ISiteUserService;
    extractionService: IUsernameExtractionService;
}

const ContentApp: React.FC<ContentAppProps> = ({ siteService, siteUserService, extractionService }) => {
    // first thing to do is figure out if we're on a site that we support (either default (reddit, youtube, twitter, etc) or user defined)
    if(siteService.locationSupported()) {
        const currentSite = siteService.getCurrentSite();

        const createTags = () => {
            const commentElements = document.querySelectorAll(currentSite.userIdentElementSelector);
            const portals: React.ReactPortal[] = [];
            for(let i = 0; i < commentElements.length; i++) {
                const commentElement = commentElements[i];
    
                const anchorElement = getElementParent(commentElement, currentSite.userIdentElementParentAnchorIndex);
    
                // if the anchor already has a component we don't want to add a another one
                // but might want to check for any new tags for that user

                const extractedUsername = extractionService.extract(commentElement.innerHTML);
    
                const user = siteUserService.getOne(extractedUsername, currentSite);

                portals.push(createPortal(
                    <TagList user={user} userService={siteUserService} />,
                    anchorElement,
                    "user" + i
                ));
            }

            return portals;
        };

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                for(let i = 0; i < mutation.addedNodes.length; i++) {
                    debugger;
                }
            })
        });

        var config = { attributes: true, childList: true, characterData: true };

        observer.observe(document.querySelector(currentSite.commentSectionContainer), config);

        return <React.Fragment>{createTags()}</React.Fragment>;
    }

    return null;
}

export default ContentApp;