import * as React from "react";
import { UserTag } from "../../common/types";
import TagInput from "./tag-input";

export interface TagListProps {
    tags: Array<UserTag>;
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
    const [editing, setEditing] = React.useState(false);

    const tagButtonHandler = () => {
        setEditing(true);
    };

    const tagInputCloseHandler = () => {
        setEditing(false);
    }

    return (
        <div className="user-tagger__tag-list">
            {tags && tags.map(t => <span key={t.name} className="user-tagger__tag">{t.name}</span>)}
            {editing ? 
            <TagInput onClose={tagInputCloseHandler} />
            :
            <button type="button" className="user-tagger__tag-button" onClick={tagButtonHandler}>+</button>
            }

        </div>
    );
}

export default TagList;