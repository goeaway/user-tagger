import * as React from "react";
import { UserTag, SiteUser } from "../../common/types";
import TagInput from "./tag-input";
import { ISiteUserService } from "../../common/abstract-types";

export interface TagListProps {
    user: SiteUser;
    userService: ISiteUserService;
}

const TagList: React.FC<TagListProps> = ({ user, userService }) => {
    const [editing, setEditing] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [tags, setTags] = React.useState(user ? user.tags : []);

    const tagButtonHandler = () => {
        setEditing(true);
    };

    const tagInputCloseHandler = () => {
        setEditing(false);
    }

    const tagInputEnterPressedHandler = (value: string) => {
        // if we don't already have one
        if(!tags.some(t => t.name === value)) {
            setEditing(false);
            const updatedTags = tags.concat({name: value, rules: []});
            userService.updateUserTagList(user.username, updatedTags);
            setTags(updatedTags);
        } else {
            setErrorMsg("Tag already on this user");
        }
    }

    const handleTagRemove = (name: string) => {
        const updatedTags = tags.filter(t => t.name !== name);
        userService.updateUserTagList(user.username, updatedTags);
        setTags(updatedTags);
    }

    return (
        <div className="user-tagger__tag-list">
            {tags && tags.map(t => <span key={t.name} className="user-tagger__tag">{t.name}<button type="button" onClick={() => handleTagRemove(t.name)}>x</button></span>)}
            {editing ? 
            <TagInput onClose={tagInputCloseHandler} onEnterPressed={tagInputEnterPressedHandler} errorMessage={errorMsg} />
            :
            <button type="button" className="user-tagger__tag-button" onClick={tagButtonHandler}>+</button>
            }

        </div>
    );
}

export default TagList;