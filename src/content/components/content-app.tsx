import * as React from "react";
import { ISiteService, ISiteUserService, IUsernameExtractionService } from "../../common/abstract-types";
import { getElementParent } from "../../common/utils/parent-element-indexer";
import { createPortal, } from "react-dom";
import TagList from "../components/tag-list";
import "../styles/structure.less";
import SiteUserServiceContext from "../context/site-user-service-context";
import UsernameExtractionServiceContext from "../context/username-extraction-service-context";
import { getElementsInViewport } from "../utils/element-utils";
import { v1 as newGuid } from "uuid";
import useElementAddedMutationEffect from "../hooks/use-element-added-mutation-effect";
import useElementScrolledInOrOutEffect from "../hooks/use-element-scrolled-in-or-out-effect";

export interface ContentAppProps {
    siteService: ISiteService;
}

const ContentApp: React.FC<ContentAppProps> = ({ siteService }) => {
    const siteUserService = React.useContext(SiteUserServiceContext);
    const extractionService = React.useContext(UsernameExtractionServiceContext);

    const [rerender, setRerender] = React.useState();
    const currentSite = siteService.getCurrentSite();
    const commentElements = getElementsInViewport(currentSite.userIdentElementSelector);
    const [tagListJustAddedTo, setTagListJustAddedTo] = React.useState(-1);
    
    useElementScrolledInOrOutEffect(
        currentSite.userIdentElementSelector,
        () => setRerender(newGuid())
    );

    useElementAddedMutationEffect(
        document.querySelector(currentSite.commentSectionContainer),
        currentSite.userIdentElementSelector,
        () => setRerender(newGuid())
    );

    const onTagAddedHandler = (username: string, listIndex: number) => {
        // use of if to avoid unnecessary rerendering
        if(listIndex === tagListJustAddedTo) {
            setRerender(newGuid());
        } else {
            setTagListJustAddedTo(listIndex)
        }
    };

    const onTagRemovedHandler = () => {
        setRerender(newGuid());
    }

    return (
        <React.Fragment>
            {commentElements.map((ce, index) => {
                const anchor = getElementParent(ce, currentSite.userIdentElementParentAnchorIndex);
                const extractedUsername = extractionService.extract(ce.innerHTML);
                const user = siteUserService.getUser(extractedUsername, currentSite);

                return createPortal(
                    <TagList 
                        listIndex={index} 
                        user={user} 
                        tags={user.tags} 
                        onTagAdded={onTagAddedHandler} 
                        onTagRemoved={onTagRemovedHandler} 
                        editLast={tagListJustAddedTo === index} 
                    />,
                    anchor,
                    "user" + index
                );
            })}
        </React.Fragment>
    );
}

export default ContentApp;
