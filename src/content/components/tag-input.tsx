import * as React from "react";
import { UserTag, RGB, SiteUser } from "../../common/types";
import TagColorPicker from "./tag-color-picker";
import TagCreationOption from "./tag-creation-option";
import { elementContainsElement, elementIsOffBottomOfViewport, elementIsOffRightOfViewport } from "../utils/element-utils"
import TagList from "./tag-list";
import ServiceContext from "../context/service-context";

export interface TagInputProps {
    onTagChange: (tag: UserTag) => void;
    onTagSwap: (oldTag: UserTag, newTag: UserTag) => void;
    onClose: () => void;
    tag?: UserTag;
    user: SiteUser;
}

const TagInput: React.FC<TagInputProps> = ({ tag, onTagChange, onClose, onTagSwap, user }) => {
    const userService = React.useContext(ServiceContext).SiteUserService;
    const containerRef = React.useRef();
    const [expandedOption, setExpandedOption] = React.useState(0);
    const [beAbove, setBeAbove] = React.useState(false);
    const [beRight, setBeRight] = React.useState(false);
    
    // adds event handler to close input when click outside of comp occurs
    React.useEffect(() => {
        const eventListener = (event: any) => {
            const current = containerRef.current as any;
            // click is not in the input
            if(current && !elementContainsElement(current, event.target)) {
                onClose();
            } 
        };

        document.addEventListener("click", eventListener);

        return () => document.removeEventListener("click", eventListener);
    }, []);

    // every time we rerender we need to check where the menu is displaying
    React.useEffect(() => {
        const current = containerRef.current as any;
        setBeAbove(current && elementIsOffBottomOfViewport(current));
        setBeRight(current && elementIsOffRightOfViewport(current));
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onTagChange({ 
            id: tag.id,
            name: event.target.value, 
            backgroundColor: tag.backgroundColor, 
            color: tag.color, 
            rules: tag.rules 
        });
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch(event.key) {
            case "Enter": {
                onClose();
                break;
            }
            case "Escape": {
                onClose();
                break;
            }
            case "ArrowDown": {
                // go to the next suggestion (if there's one to go to)
                break;
            }
            case "ArrowUp": {
                // go to the previous suggestion (if there's one to go to)
                break;
            }
        }
    }
    
    const tagColorChangeHandler = (rgb: RGB) => {
        onTagChange({ id: tag.id, name: tag.name, rules: tag.rules, color: tag.color, backgroundColor: rgb });
    }

    const textColorChangeHandler = (rgb: RGB) => {
        onTagChange({ id: tag.id, name: tag.name, rules: tag.rules, backgroundColor: tag.backgroundColor, color: rgb});
    }

    const creationOptionCollapseClickedHandler = (id: number, expanded: boolean) => {
        if(!expanded) {
            setExpandedOption(id);
        } else {
            setExpandedOption(-1);
        }
    }

    const tagSuggestionSelectedHandler = (newTag: UserTag) => {
        onTagSwap(tag, newTag);
    }

    return (
        <div className={`user-tagger__tag-input user-tagger__tag-input--${(beAbove ? "above" : "beneath")} user-tagger__tag-input--${(beRight ? "right" : "left")}`} 
            ref={containerRef} 
            onKeyDown={handleKeyPress}>
            <TagCreationOption optionId={0} expanded={expandedOption === 0} title="Suggestions" onCollapseClicked={creationOptionCollapseClickedHandler}>
                <TagList listIndex={0} tags={userService.getTagsNotFoundOnUser(user)} user={user} preview={true} onTagClick={tagSuggestionSelectedHandler} onTagAdded={() => {}} onTagRemoved={() => {}} />
            </TagCreationOption>

            <TagCreationOption optionId={1} expanded={expandedOption === 1} title="Text" onCollapseClicked={creationOptionCollapseClickedHandler}>
                <input type="text" value={tag.name} onChange={handleChange} placeholder="Tag Text..." autoFocus />
            </TagCreationOption>

            <TagCreationOption optionId={2} expanded={expandedOption === 2} title="Tag Color" onCollapseClicked={creationOptionCollapseClickedHandler}>
                <TagColorPicker onValueChanged={tagColorChangeHandler} initialValues={tag.backgroundColor} />
            </TagCreationOption>

            <TagCreationOption optionId={3} expanded={expandedOption === 3} title="Text Color" onCollapseClicked={creationOptionCollapseClickedHandler}>
                <TagColorPicker onValueChanged={textColorChangeHandler} initialValues={tag.color} />
            </TagCreationOption>
            {/** Another one for rules at some point */}
        </div>
    );
}

export default TagInput;