import * as React from "react";
import { UserTag, RGBExtensions } from "../../common/types";

export interface TagProps {
    tag: UserTag;
    onTagRemove: (tagName: string) => void;
    previewMode?: boolean;
    onTagClick?: (tag: UserTag) => void;
}

const Tag : React.FC<TagProps> = ({ tag, onTagRemove, previewMode, onTagClick }) => {
    const handleTagClick = () => {
        // open menu to change value, color
        if(!previewMode) {

        } else {

        }

        onTagClick(tag);
    };

    return (
        <span className="user-tagger__tag" style={{color: RGBExtensions.getStringForCss(tag.color)}} onClick={() => handleTagClick}>
            <span className="user-tagger__tag__arrow" style={{borderRightColor: RGBExtensions.getStringForCss(tag.backgroundColor)}}></span>
            <span className="user-tagger__tag__content" style={{backgroundColor: RGBExtensions.getStringForCss(tag.backgroundColor)}}>
                {tag.name}
                <button type="button" className="user-tagger__tag__close-button" onClick={() => previewMode ? () => {}: onTagRemove(tag.name)}>
                    &times;
                </button>
            </span>
            <span className="user-tagger__tag__menu">
            </span>
        </span>
    );
}

export default Tag;