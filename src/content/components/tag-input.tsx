import * as React from "react";
import TagSuggestionList from "./tag-suggestion-list";
import { ISiteUserService } from "../../common/abstract-types";
import { UserTag, UserTagSuggestion } from "../../common/types";

export interface TagInputProps {
    onClose: () => void;
    onEnterPressed: (value: string) => void;
    errorMessage: string;
    userService: ISiteUserService;
}

const TagInput: React.FC<TagInputProps> = ({ onClose, onEnterPressed, errorMessage, userService }) => {
    const outsideClickRef = React.useRef();
    const [value, setValue] = React.useState("");
    const [ignoreError, setIgnoreError] = React.useState(false);

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
        setValue(event.target.value);
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
        onEnterPressed(value);
        setIgnoreError(false);
    }
    
    const cancelClickHandler = () => {
        onClose();
        setIgnoreError(false);
    }

    const suggestionListItemClickedHandler = (tag: UserTag) => {
        onEnterPressed(tag.name);
        setIgnoreError(false);
    }

    return (
        <div className="user-tagger__tag-input" ref={outsideClickRef} onKeyDown={handleKeyPress}>
            <input type="text" value={value} onChange={handleChange} placeholder="Start typing to find existing or create new..." autoFocus />
            <button className="user-tagger__tag-button" onClick={confirmClickHandler}>Y</button>
            <button className="user-tagger__tag-button" onClick={cancelClickHandler}>X</button>
            {errorMessage && !ignoreError && <span className="user-tagger__tag-input__error">{errorMessage}</span>}
            <TagSuggestionList search={value} userService={userService} onSuggestionClicked={suggestionListItemClickedHandler} />
        </div>
    );
}

export default TagInput;