import * as React from "react";
import { ISiteService, ISiteUserService, IUsernameExtractionService } from "../../common/abstract-types";
import { getElementParent } from "../../common/utils/parent-element-indexer";
import { createPortal, } from "react-dom";
import TagList from "../components/tag-list";
import "../styles/structure.less";
import SiteUserServiceContext from "../context/site-user-service-context";
import UsernameExtractionServiceContext from "../context/username-extraction-service-context";

export interface ContentAppProps {
    siteService: ISiteService;
}

const ContentApp: React.FC<ContentAppProps> = ({ siteService }) => {
    const siteUserService = React.useContext(SiteUserServiceContext);
    const extractionService = React.useContext(UsernameExtractionServiceContext);

    const [rerender, setRerender] = React.useState(false);
    const currentSite = siteService.getCurrentSite();
    const commentElements = [].slice.call(document.querySelectorAll(currentSite.userIdentElementSelector)) as Array<Element>;
    const [tagListJustAddedTo, setTagListJustAddedTo] = React.useState(-1);
    
    React.useEffect(() => {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                for(let i = 0; i < mutation.addedNodes.length; i++) {
                    debugger;
                    // check that at least one of the nodes added are of the type that would hold a comment and then force an update if so
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
            setRerender(!rerender);
        } else {
            setTagListJustAddedTo(listIndex)
        }
    };

    const onTagRemovedHandler = (username: string) => {
        setRerender(!rerender);
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
