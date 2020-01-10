import * as React from "react";
import { ISiteUserService } from "../../common/abstract-types";

export interface TagSuggestionListProps {
    search: string;
    userService: ISiteUserService;
}

const TagSuggestionList: React.FC<TagSuggestionListProps> = ({ search, userService }) => {
    const filteredTags = userService.getTags(search);
    return (
        <React.Fragment>
        {
            filteredTags.length > 0 && 
            <div className="user-tagger__tag-input__tag-suggestions">
                <ul className="user-tagger__tag-input__tag-suggestions__list">
                    {filteredTags.map(t => <li className="user-tagger__tag-input__tag-suggestions__list__item" key={t.name}>{t.name}</li>)}
                </ul>
            </div>
        }
        </React.Fragment>
    );
}

export default TagSuggestionList;