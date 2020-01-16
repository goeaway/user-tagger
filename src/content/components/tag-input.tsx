import * as React from "react";
import TagSuggestionList from "./tag-suggestion-list";
import { ISiteUserService } from "../../common/abstract-types";
import { UserTag, UserTagSuggestion, RGB, RGBExtensions } from "../../common/types";
import TagColorPicker from "./tag-color-picker";
import Tag from "./tag";
import TagCreationOption from "./tag-creation-option";
import { getRandomRGBValue, getRandomTagName } from "../utils/randomisations";
import { elementContainsElement } from "../utils/element-utils"

export interface TagInputProps {
    onTagChange: (tag: UserTag) => void;
    onClose: () => void;
    isCreate: boolean;
    tag?: UserTag;
}

const TagInput: React.FC<TagInputProps> = ({ tag, isCreate, onTagChange, onClose }) => {
    const containerRef = React.useRef();
    const [expandedOption, setExpandedOption] = React.useState(0);

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

    return (
        <div className="user-tagger__tag-input" ref={containerRef} onKeyDown={handleKeyPress}>
            {/* <TagSuggestionList search={newTag.name} userService={userService} onSuggestionClicked={suggestionListItemClickedHandler} /> */}
            <div className="user-tagger__tag-input__tag-options">
                <TagCreationOption optionId={0} expanded={expandedOption === 0} title={"Text"} onCollapseClicked={creationOptionCollapseClickedHandler}>
                    <input type="text" value={tag.name} onChange={handleChange} placeholder="Tag Text..." autoFocus />
                </TagCreationOption>

                <TagCreationOption optionId={1} expanded={expandedOption === 1} title={"Tag Color"} onCollapseClicked={creationOptionCollapseClickedHandler}>
                    <TagColorPicker onValueChanged={tagColorChangeHandler} initialValues={tag.backgroundColor} />
                </TagCreationOption>

                <TagCreationOption optionId={2} expanded={expandedOption === 2} title={"Text Color"} onCollapseClicked={creationOptionCollapseClickedHandler}>
                    <TagColorPicker onValueChanged={textColorChangeHandler} initialValues={tag.color} />
                </TagCreationOption>
                {/** Another one for rules at some point */}
            </div>
        </div>
    );
}

export default TagInput;