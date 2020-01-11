import * as React from "react";
import { ISiteUserService } from "../../common/abstract-types";
import { UserTag } from "../../common/types";
import TagSuggestionListItem from "./tag-suggestion-list-item";

export interface TagSuggestionListProps {
    search: string;
    userService: ISiteUserService;
    onSuggestionClicked: (tag: UserTag) => void;
}

const TagSuggestionList: React.FC<TagSuggestionListProps> = ({ search, userService, onSuggestionClicked: onItemClicked }) => {
    const filteredTags = userService.getTags(search);

    return (
        <React.Fragment>
        {
            filteredTags.length > 0 && 
            <div className="user-tagger__tag-input__tag-suggestions">
                <ul className="user-tagger__tag-input__tag-suggestions__list">
                    {filteredTags.map(t => <TagSuggestionListItem tag={t} onItemClicked={onItemClicked} />)}
                </ul>
            </div>
        }
        </React.Fragment>
    );
}

export default TagSuggestionList;