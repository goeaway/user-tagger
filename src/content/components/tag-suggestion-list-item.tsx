import * as React from "react";
import { UserTag } from "../../common/types";

export interface TagSuggestionListItemProps {
    tag: UserTag;
    onItemClicked: (tag: UserTag) => void;
}

const TagSuggestionListItem: React.FC<TagSuggestionListItemProps> = ({ tag, onItemClicked }) => {
    const [beingHovered, setBeingHovered] = React.useState(false);

    const mouseOverHandler = () => {
        setBeingHovered(true);
    }

    const mouseOutHandler = () => {
        setBeingHovered(false);
    }

    return (
        <li
            onMouseOver={mouseOverHandler} 
            onMouseOut={mouseOutHandler} 
            onClick={() => onItemClicked(tag)} 
            className={`user-tagger__tag-input__tag-suggestions__list__item${beingHovered ? " user-tagger__tag-input__tag-suggestions__list__item--hovered": ""}`}
            key={tag.name}>
            {tag.name}
        </li>
    );
}

export default TagSuggestionListItem;