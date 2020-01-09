import * as React from "react";
import { ISiteUserService } from "../../common/abstract-types";

export interface TagSuggestionListProps {
    search: string;
    userService: ISiteUserService;
}

const TagSuggestionList: React.FC<TagSuggestionListProps> = ({ search, userService }) => {
    const filteredTags = userService.getTags(search);

    return (
        <div className="user-tagger__tag-input__tag-suggestions">
            <ul>
                {filteredTags.map(t => <li key={t.name}>{t.name}</li>)}
            </ul>
        </div>
    );
}

export default TagSuggestionList;