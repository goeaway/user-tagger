import * as React from "react";

export interface TagCreationOptionProps {
    expanded: boolean;
    optionId: number;
    onCollapseClicked: (id: number, expanded: boolean) => void;
}

const TagCreationOption: React.FC<TagCreationOptionProps> = ({ expanded, optionId, onCollapseClicked, children }) => {
    return (
        <div className={"user-tagger__tag-input__creation-option" + (expanded ? " user-tagger__tag-input__creation-option--expanded" : "")}>
            <button type="button" onClick={() => onCollapseClicked(optionId, expanded)} >{expanded ? "up" : "down"}</button>
            {expanded && children}
        </div>
    )
}

export default TagCreationOption;