import * as React from "react";

export interface TagInputProps {
    onClose: () => void;
    onEnterPressed: (value: string) => void;
    errorMessage: string;
}

const TagInput: React.FC<TagInputProps> = ({ onClose, onEnterPressed, errorMessage }) => {
    const [value, setValue] = React.useState("");
    const [ignoreError, setIgnoreError] = React.useState(false);

    React.useEffect(() => {

    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if(!ignoreError) {
            setIgnoreError(true);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            onEnterPressed(value);
        } else if (event.key === "Escape") {
            onClose();
        }
    }

    return (
        <div className="user-tagger__tag-input">
            <input type="text" value={value} onChange={handleChange} placeholder="Start typing to find existing or create new..." onKeyDown={handleKeyPress} autoFocus />
            <button type="button" className="user-tagger__tag-input__complete-button" onClick={() => onEnterPressed(value)}>Y</button>
            <button type="button" className="user-tagger__tag-input__cancel-button" onClick={onClose}>&times;</button>
            {errorMessage && !ignoreError && <span>{errorMessage}</span>}
            <div className="user-tagger__tag-input__existing">

            </div>
        </div>
    );
}

export default TagInput;