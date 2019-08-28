import * as React from "react";
import { ISiteService, IStorageService, ISiteUserService, IUsernameExtractionService } from "../../common/abstract-types";
import * as selector from "css-select";
import { getElementParent } from "../../common/utils/parent-element-indexer";
import { createPortal, findDOMNode } from "react-dom";
import TagList from "../components/tag-list";
import { Site } from "../../common/types";

export interface ContentAppProps {
    siteService: ISiteService;
    siteUserService: ISiteUserService;
    extractionService: IUsernameExtractionService;
}

const ContentApp: React.FC<ContentAppProps> = ({ siteService, siteUserService, extractionService }) => {
    // first thing to do is figure out if we're on a site that we support (either default (reddit, youtube, twitter, etc) or user defined)
    if(siteService.locationSupported()) {
        const currentSite = siteService.getCurrentSite();

        const mountTags = () => {
            const commentElements = document.querySelectorAll(currentSite.userIdentElementSelector);
    
            for(let i = 0; i < commentElements.length; i++) {
                const commentElement = commentElements[i];
    
                const anchorElement = getElementParent(commentElement, currentSite.userIdentElementParentAnchorIndex);
    
                const extractedUsername = extractionService.extract(commentElement.innerHTML);
    
                const user = siteUserService.getOne(extractedUsername, currentSite);
                // if the user is not undefined it means we got some tags to add
                let tags = [];
    
                if(user) {
                    tags = user.tags;

                    // apply rules based on the user's tags i.e. hide/highlight here
                }
    
                createPortal(
                    <TagList tags={tags} />,
                    anchorElement
                );
            }
        };

        // an event handler should be set up
        currentSite.defineTriggers(mountTags); 
    }

    return null;
}

export default ContentApp;