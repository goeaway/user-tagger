import * as React from "react";
import { UserTag, SiteUser } from "../../common/types";
import TagInput from "./tag-input";
import { ISiteUserService } from "../../common/abstract-types";
import Tag from "./tag";

export interface TagListProps {
    user: SiteUser;
    userService: ISiteUserService;
    onTagAdded: (username: string) => void;
    onTagRemoved: (username: string) => void;
}

const TagList: React.FC<TagListProps> = ({ user, userService, onTagAdded, onTagRemoved }) => {
    const [editing, setEditing] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState();

    const tagButtonHandler = () => {
        setEditing(true);
    };

    const tagInputCloseHandler = () => {
        setEditing(false);
        setErrorMsg(undefined);
    }

    const tagInputEnterPressedHandler = (value: string) => {
        if(!value || value.trim() == "") {
            setErrorMsg("Enter something");
            return;
        }

        // if we don't already have one
        if(!user.tags.some(t => t.name === value)) {
            setEditing(false);
            const updatedTags = user.tags.concat({name: value.trim(), rules: [], backgroundColor: "#000", color: "#fff"});
            userService.updateUserTags(user.username, updatedTags);
            setErrorMsg(undefined);
            onTagAdded(user.username);
        } else {
            setErrorMsg("Tag already on this user");
        }
    }

    const handleTagRemove = (name: string) => {
        const updatedTags = user.tags.filter(t => t.name !== name);
        userService.updateUserTags(user.username, updatedTags);
        onTagRemoved(user.username);
    }

    return (
        <div className="user-tagger__tag-list">
            {user && user.tags && user.tags.map(t => <Tag tag={t} handleTagRemove={handleTagRemove} key={t.name}/>)}
            {editing ? 
            <TagInput 
                onClose={tagInputCloseHandler} 
                onEnterPressed={tagInputEnterPressedHandler} 
                errorMessage={errorMsg}
                userService={userService} />
            :
            <button type="button" className="user-tagger__tag-button" onClick={tagButtonHandler}>+</button>
            }

        </div>
    );
}

export default TagList;