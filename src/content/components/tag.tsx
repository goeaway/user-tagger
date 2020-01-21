import * as React from "react";
import { UserTag, RGBExtensions, SiteUser } from "../../common/types";
import TagInput from "./tag-input";

export interface TagProps {
    user: SiteUser;
    tag: UserTag;
    onTagChange: (tag: UserTag) => void;
    onTagSwap: (oldTag: UserTag, newTag: UserTag) => void;
    onTagRemove: (tagName: string) => void;
    startEditing?: boolean;
    onPreviewClick?: (tag: UserTag) => void;
}

const Tag : React.FC<TagProps> = ({ user, tag, onTagRemove, onTagChange, onTagSwap, startEditing, onPreviewClick }) => {
    const [editing, setEditing] = React.useState((startEditing && !onPreviewClick) || false);

    const handleTagClick = () => {
        if(!onPreviewClick) {
            setEditing(true);
        } else {
            onPreviewClick(tag);
        }
    };

    const handleClose = () => {
        if(!onPreviewClick) {
            setEditing(false);
        }
    }

    return (
        <span className="user-tagger__tag" onClick={handleTagClick}>
            <span className="user-tagger__tag__arrow__shadow"></span>
            <span className="user-tagger__tag__arrow" style={{borderRightColor: RGBExtensions.getStringForCss(tag.backgroundColor)}}></span>
            <span className="user-tagger__tag__content" style={{backgroundColor: RGBExtensions.getStringForCss(tag.backgroundColor), color: RGBExtensions.getStringForCss(tag.color)}}>
                {tag.name}
                <button type="button" className="user-tagger__tag__close-button" onClick={() => onTagRemove(tag.id)}>
                    &times;
                </button>
            </span>
            {editing && <TagInput tag={tag} onTagChange={onTagChange} onTagSwap={onTagSwap} onClose={handleClose} user={user}/>}
        </span>
    );
}

export default Tag;