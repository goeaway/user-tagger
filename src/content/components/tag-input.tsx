import * as React from "react";

export interface TagInputProps {
    onClose: () => void;
    onEnterPressed: (value: string) => void;
    errorMessage: string;
}

const TagInput: React.FC<TagInputProps> = ({ onClose, onEnterPressed, errorMessage }) => {
    const [value, setValue] = React.useState("");
    const [ignoreError, setIgnoreError] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if(!ignoreError) {
            setIgnoreError(true);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            onEnterPressed(value);
            setIgnoreError(false);
        } else if (event.key === "Escape") {
            onClose();
            setIgnoreError(false);
        }
    }
    
    return (
        <div className="user-tagger__tag-input" onBlurCapture={onClose} >
            <input type="text" value={value} onChange={handleChange} placeholder="Start typing to find existing or create new..." onKeyDown={handleKeyPress} autoFocus />
            {errorMessage && !ignoreError && <span className="user-tagger__tag-input__error">{errorMessage}</span>}
            <div className="user-tagger__tag-input__existing">

            </div>
        </div>
    );
}

export default TagInput;