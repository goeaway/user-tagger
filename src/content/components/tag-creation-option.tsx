import * as React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
export interface TagCreationOptionProps {
    expanded: boolean;
    optionId: number;
    onCollapseClicked: (id: number, expanded: boolean) => void;
    title: string;
}

const TagCreationOption: React.FC<TagCreationOptionProps> = ({ title, expanded, optionId, onCollapseClicked, children }) => {
    return (
        <div className={"user-tagger__tag-input__creation-option" + (expanded ? " user-tagger__tag-input__creation-option--expanded" : "")}>
            <div className="user-tagger__tag-input__creation-option__header" onClick={() => onCollapseClicked(optionId, expanded)}>
                <span className="user-tagger__tag-input__creation-option__title">{title}</span>
                {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {expanded && <div className="user-tagger__tag-input__creation-option__content">{children}</div>}
        </div>
    )
}

export default TagCreationOption;