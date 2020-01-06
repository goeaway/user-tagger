import * as React from "react";
import { UserTag, SiteUser } from "../../common/types";
import TagInput from "./tag-input";
import { ISiteUserService } from "../../common/abstract-types";
import Tag from "./tag";

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
        setErrorMsg(undefined);
    }

    const tagInputEnterPressedHandler = (value: string) => {
        // if we don't already have one
        if(!tags.some(t => t.name === value)) {
            setEditing(false);
            const updatedTags = tags.concat({name: value, rules: [], backgroundColor: "#000", color: "#fff"});
            userService.updateUserTagList(user.username, updatedTags);
            setTags(updatedTags);
            setErrorMsg(undefined);
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
            {tags && tags.map(t => <Tag tag={t} handleTagRemove={handleTagRemove} key={t.name}/>)}
            {editing ? 
            <TagInput 
                onClose={tagInputCloseHandler} 
                onEnterPressed={tagInputEnterPressedHandler} 
                errorMessage={errorMsg} />
            :
            <button type="button" className="user-tagger__tag-button" onClick={tagButtonHandler}>+</button>
            }

        </div>
    );
}

export default TagList;