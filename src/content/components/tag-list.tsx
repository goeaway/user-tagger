import * as React from "react";
import { UserTag, SiteUser, RGB, RGBExtensions } from "../../common/types";
import TagInput from "./tag-input";
import { ISiteUserService } from "../../common/abstract-types";
import Tag from "./tag";
import { getRandomTagName, getRandomRGBValue } from "../utils/randomisations";

export interface TagListProps {
    user: SiteUser;
    userService: ISiteUserService;
    onTagAdded: (username: string) => void;
    onTagRemoved: (username: string) => void;
}

const TagList: React.FC<TagListProps> = ({ user, userService, onTagAdded, onTagRemoved }) => {
    
    const tagButtonHandler = () => {
        // add a new tag to the list and set it to isNew
        const newTag: UserTag = 
        { 
            id: "",
            name: getRandomTagName(), 
            rules: [], 
            backgroundColor: getRandomRGBValue(), 
            color: RGBExtensions.white()
        };

        const updatedTags = user.tags.concat(newTag);
        userService.updateUserTags(user.username, updatedTags);
        onTagAdded(user.username);
    };

    const handleTagRemove = (name: string) => {
        const updatedTags = user.tags.filter(t => t.name !== name);
        userService.updateUserTags(user.username, updatedTags);
        onTagRemoved(user.username);
    }

    const handleTagChange = (newTag: UserTag) => {
        const existing = user.tags.find(t => t.id === newTag.id);
        if(existing) {
            existing.name = newTag.name;
            existing.rules = newTag.rules;
            existing.backgroundColor = newTag.backgroundColor;
            existing.color = newTag.color;
        }

        userService.updateUserTags(user.username, user.tags);
        onTagAdded(user.username);
    }

    return (
        <div className="user-tagger__tag-list">
            {user && user.tags && user.tags.map(t => 
                <Tag 
                    tag={t} 
                    onTagChange={handleTagChange} 
                    onTagRemove={handleTagRemove} 
                    key={t.name}
                />
            )}
            <button 
                type="button" 
                className="user-tagger__tag-button" 
                onClick={tagButtonHandler}>
                    +
            </button>
        </div>
    );
}

export default TagList;