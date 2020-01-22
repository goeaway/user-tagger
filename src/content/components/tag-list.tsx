import * as React from "react";
import { UserTag, SiteUser, RGBExtensions } from "../../common/types";
import Tag from "./tag";
import { getRandomTagName, getRandomRGBValue } from "../utils/randomisations";
import { v1 } from "uuid";
import ServiceContext from "../context/service-context";

export interface TagListProps {
    listIndex: number;
    user: SiteUser;
    tags: Array<UserTag>;
    onTagAdded: (username: string, listIndex: number) => void;
    onTagRemoved: (username: string) => void;
    onTagClick?: (tag: UserTag) => void;
    editLast?: boolean;
    preview?: boolean;
}

const TagList: React.FC<TagListProps> = ({ listIndex, user, tags, onTagAdded, onTagRemoved, onTagClick, editLast, preview }) => {
    const userService = React.useContext(ServiceContext).SiteUserService;
    
    const tagButtonHandler = () => {
        // add a new tag to the list and set it to isNew
        const newTag: UserTag = 
        { 
            id: v1(),
            name: getRandomTagName(), 
            rules: [], 
            backgroundColor: getRandomRGBValue(), 
            color: RGBExtensions.white()
        };

        const updatedTags = tags.concat(newTag);
        user.tags = updatedTags;
        userService.setUser(user);
        // userService.updateUserTags(user.username, updatedTags);
        onTagAdded(user.username, listIndex);
    };

    const handleTagRemove = (id: string) => {
        const updatedTags = tags.filter(t => t.id !== id);
        user.tags = updatedTags;
        userService.setUser(user);
        // userService.updateUserTags(user.username, updatedTags);
        onTagRemoved(user.username);
    }

    const handleTagChange = (newTag: UserTag) => {
        const existing = tags.find(t => t.id === newTag.id);
        if(existing) {
            existing.name = newTag.name;
            existing.rules = newTag.rules;
            existing.backgroundColor = newTag.backgroundColor;
            existing.color = newTag.color;
        }

        user.tags = tags;
        userService.setUser(user);
        // userService.updateUserTags(user.username, tags);
        // -1 because we don't want the last tag in this list to open
        onTagAdded(user.username, -1);
    }

    const handleTagSwap = (oldTag: UserTag, newTag: UserTag) => {
        const oldTagIndex = tags.indexOf(oldTag);

        if(oldTagIndex > -1) {
            tags[oldTagIndex] = newTag;
        }

        user.tags = tags;
        userService.setUser(user);
        // userService.updateUserTags(user.username, tags);
        // -1 because we don't want the last tag in this list to open
        onTagAdded(user.username, -1);
    }

    return (
        <div className="user-tagger__tag-list">
            <div className="user-tagger__tag-list__inner">
                {tags && tags.map((t, index) => 
                    <Tag 
                        tag={t} 
                        onTagChange={handleTagChange} 
                        onTagSwap={handleTagSwap}
                        onTagRemove={handleTagRemove} 
                        key={t.id}
                        startEditing={index === user.tags.length -1 && editLast}
                        user={user}
                        onPreviewClick={preview && onTagClick}
                    />
                )}
                {
                    !preview && !onTagClick && 
                    <button 
                        type="button" 
                        className="user-tagger__tag-button" 
                        onClick={tagButtonHandler}>
                            +
                    </button>
                }
                {preview && (!tags || tags.length == 0) && <small><i>No Tags...</i></small>}
            </div>
        </div>
    );
}

export default TagList;