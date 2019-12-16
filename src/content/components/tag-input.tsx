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
        }
    }

    return (
        <div className="user-tagger__tag-input">
            <div>
                <input type="text" value={value} onChange={handleChange} onKeyDown={handleKeyPress} autoFocus />
                <button type="button" onClick={onClose}>X</button>
            </div>
            {errorMessage && !ignoreError && <span>{errorMessage}</span>}
        </div>
    );
}

export default TagInput;