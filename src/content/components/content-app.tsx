import * as React from "react";
import { ISiteService, ISiteUserService, IUsernameExtractionService } from "../../common/abstract-types";
import { getElementParent } from "../../common/utils/parent-element-indexer";
import { createPortal, } from "react-dom";
import TagList from "../components/tag-list";
import "../styles/structure.less";
import SiteUserServiceContext from "../context/site-user-service-context";
import UsernameExtractionServiceContext from "../context/username-extraction-service-context";
import { elementContainsElementWithSelector, getElementsInViewport } from "../utils/element-utils";
import { v1 } from "uuid";

export interface ContentAppProps {
    siteService: ISiteService;
}

const ContentApp: React.FC<ContentAppProps> = ({ siteService }) => {
    const siteUserService = React.useContext(SiteUserServiceContext);
    const extractionService = React.useContext(UsernameExtractionServiceContext);

    const [rerender, setRerender] = React.useState();
    const currentSite = siteService.getCurrentSite();
    // filter this collection so we only get back the ones visible in the viewport 
    const commentElements = getElementsInViewport(currentSite.userIdentElementSelector);
    const [tagListJustAddedTo, setTagListJustAddedTo] = React.useState(-1);
    
    React.useEffect(() => {
        const scrollEvent = (event) => {
            // every time comment is scrolled into view we should rerender

            // if any node in "getElementsInViewport(currentSite.userIdentElementSelector);" list does not contain the user tagger div in it already
            // if any node with user tagger already is scrolled out of view we should re render
            // we should rerender
        };

        window.addEventListener("scroll", scrollEvent);

        return () => window.removeEventListener("scroll", scrollEvent);
    });

    React.useEffect(() => {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                for(let i = 0; i < mutation.addedNodes.length; i++) {
                    const addedNode = mutation.addedNodes[i];
                    // if the addedNode contains the currentSite.userIdentElementSelector we need to rerender
                    if (elementContainsElementWithSelector(addedNode, currentSite.userIdentElementSelector)) {
                        setRerender(v1());
                        return;
                    }
                }
            })
        });
        
        var config = { attributes: true, childList: true, characterData: true };
        
        observer.observe(document.querySelector(currentSite.commentSectionContainer), config);

        return () => observer.disconnect();
    }, []);

    const onTagAddedHandler = (username: string, listIndex: number) => {
        // use of if to avoid unnecessary rerendering
        if(listIndex === tagListJustAddedTo) {
            setRerender(v1());
        } else {
            setTagListJustAddedTo(listIndex)
        }
    };

    const onTagRemovedHandler = () => {
        setRerender(v1());
    }

    return (
        <React.Fragment>
            {commentElements.map((ce, index) => {
                const anchor = getElementParent(ce, currentSite.userIdentElementParentAnchorIndex);
                const extractedUsername = extractionService.extract(ce.innerHTML);
                const user = siteUserService.getUser(extractedUsername, currentSite);

                return createPortal(
                    <TagList listIndex={index} user={user} tags={user.tags} onTagAdded={onTagAddedHandler} editLast={tagListJustAddedTo === index} onTagRemoved={onTagRemovedHandler} />,
                    anchor,
                    "user" + index
                );
            })}
        </React.Fragment>
    );
}

export default ContentApp;
