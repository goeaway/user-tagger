import * as React from "react";
import { UserTag, RGBExtensions } from "../../common/types";
import TagInput from "./tag-input";

export interface TagProps {
    tag: UserTag;
    onTagChange: (tag: UserTag) => void;
    onTagRemove: (tagName: string) => void;
}

const Tag : React.FC<TagProps> = ({ tag, onTagRemove, onTagChange }) => {
    const [editing, setEditing] = React.useState(false);

    const handleTagClick = () => {
        setEditing(true);
    };

    const handleClose = () => {
        setEditing(false);
    }

    return (
        <React.Fragment>
            <span className="user-tagger__tag" style={{color: RGBExtensions.getStringForCss(tag.color)}} onClick={handleTagClick}>
                <span className="user-tagger__tag__arrow" style={{borderRightColor: RGBExtensions.getStringForCss(tag.backgroundColor)}}></span>
                <span className="user-tagger__tag__content" style={{backgroundColor: RGBExtensions.getStringForCss(tag.backgroundColor)}}>
                    {tag.name}
                    <button type="button" className="user-tagger__tag__close-button" onClick={() => onTagRemove(tag.id)}>
                        &times;
                    </button>
                </span>
            </span>
            {editing && <TagInput tag={tag} isCreate={false} onTagChange={onTagChange} onClose={handleClose} />}
        </React.Fragment>
    );
}

export default Tag;