import * as React from "react";
import { UserTag } from "../../common/types";

export interface TagProps {
    tag: UserTag;
    handleTagRemove: (tagName: string) => void;
}

const Tag : React.FC<TagProps> = ({tag, handleTagRemove}) => {
    const handleTagClick = () => {
        // open menu to change value, color
    };

    return (
        <span className="user-tagger__tag" style={{color: tag.color}} onClick={() => handleTagClick}>
            <span className="user-tagger__tag__arrow" style={{borderRightColor: tag.backgroundColor}}></span>
            <span className="user-tagger__tag__content" style={{backgroundColor: tag.backgroundColor}}>
                {tag.name}
                <button type="button" className="user-tagger__tag__close-button" onClick={() => handleTagRemove(tag.name)}>
                    &times;
                </button>
            </span>
        </span>
    );
}

export default Tag;