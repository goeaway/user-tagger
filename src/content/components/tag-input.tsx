import * as React from "react";

export interface TagInputProps {
    onClose: () => void;
}

const TagInput: React.FC<TagInputProps> = ({ onClose }) => {
    return (
        <div className="user-tagger__tag-input">
            <input type="text" />
            <button type="button" onClick={onClose}>X</button>
        </div>
    );
}

export default TagInput;