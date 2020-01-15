import * as React from "react";
import TagSuggestionList from "./tag-suggestion-list";
import { ISiteUserService } from "../../common/abstract-types";
import { UserTag, UserTagSuggestion, RGB, RGBExtensions } from "../../common/types";
import TagColorPicker from "./tag-color-picker";
import Tag from "./tag";
import TagCreationOption from "./tag-creation-option";
import { getRandomRGBValue, getRandomTagName } from "../utils/randomisations";

export interface TagInputProps {
    onClose: () => void;
    onConfirm: (tag: UserTag) => void;
    errorMessage: string;
    userService: ISiteUserService;
    tag?: UserTag;
}

const TagInput: React.FC<TagInputProps> = ({ tag, onClose, onConfirm, errorMessage, userService }) => {
    const outsideClickRef = React.useRef();
    const [ignoreError, setIgnoreError] = React.useState(false);
    const [newTag, setNewTag] = React.useState<UserTag>
    (tag || {
         name: getRandomTagName(), 
         rules: [], 
         backgroundColor: getRandomRGBValue(), 
         color: RGBExtensions.white()
    });
    const [expandedOption, setExpandedOption] = React.useState(0);

    // adds event handler to close input when click outside of comp occurs
    React.useEffect(() => {
        const eventListener = (event: any) => {
            const current = outsideClickRef.current as any;
            // click is not in the input
            if(current && !current.contains(event.target)) {
                cancelClickHandler();
            }
        };

        document.addEventListener("click", eventListener);

        return () => document.removeEventListener("click", eventListener);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag({ 
            name: event.target.value, 
            backgroundColor: newTag.backgroundColor, 
            color: newTag.color, 
            rules: newTag.rules 
        });

        if(!ignoreError) {
            setIgnoreError(true);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch(event.key) {
            case "Enter": {
                confirmClickHandler();
                break;
            }
            case "Escape": {
                cancelClickHandler();
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
    
    const confirmClickHandler = () => {
        onConfirm(newTag);
        setIgnoreError(false);
    }
    
    const cancelClickHandler = () => {
        onClose();
        setIgnoreError(false);
    }

    const suggestionListItemClickedHandler = (tag: UserTag) => {
        onConfirm(tag);
        setIgnoreError(false);
    }

    const tagColorChangeHandler = (rgb: RGB) => {
        setNewTag({ name: newTag.name, rules: newTag.rules, color: newTag.color, backgroundColor: rgb });
    }

    const textColorChangeHandler = (rgb: RGB) => {
        setNewTag({ name: newTag.name, rules: newTag.rules, backgroundColor: newTag.backgroundColor, color: rgb});
    }

    const creationOptionCollapseClickedHandler = (id: number, expanded: boolean) => {
        if(!expanded) {
            setExpandedOption(id);
        } else {
            setExpandedOption(-1);
        }
    }

    return (
        <div className="user-tagger__tag-input" ref={outsideClickRef} onKeyDown={handleKeyPress}>
            <Tag previewMode={true} tag={newTag} onTagRemove={null} />
            <button className="user-tagger__tag-button" onClick={confirmClickHandler}>Y</button>
            <button className="user-tagger__tag-button" onClick={cancelClickHandler}>X</button>

            {/* <TagSuggestionList search={newTag.name} userService={userService} onSuggestionClicked={suggestionListItemClickedHandler} /> */}
            <div className="user-tagger__tag-input__tag-options">
                <TagCreationOption optionId={0} expanded={expandedOption === 0} onCollapseClicked={creationOptionCollapseClickedHandler}>
                    <input type="text" value={newTag.name} onChange={handleChange} placeholder="Tag Name..." autoFocus />
                </TagCreationOption>

                <TagCreationOption optionId={1} expanded={expandedOption === 1} onCollapseClicked={creationOptionCollapseClickedHandler}>
                    <TagColorPicker onValueChanged={tagColorChangeHandler} initialValues={newTag.backgroundColor} />
                </TagCreationOption>

                <TagCreationOption optionId={2} expanded={expandedOption === 2} onCollapseClicked={creationOptionCollapseClickedHandler}>
                    <TagColorPicker onValueChanged={textColorChangeHandler} initialValues={newTag.color} />
                </TagCreationOption>
                {/** Another one for rules at some point */}
            </div>


            {errorMessage && !ignoreError && <span className="user-tagger__tag-input__error">{errorMessage}</span>}
        </div>
    );
}

export default TagInput;