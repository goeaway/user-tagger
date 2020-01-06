import { IUsernameExtractionService } from "../abstract-types";

export default class UsernameExtractionService implements IUsernameExtractionService {
    extract = (elementHTML: string) : string => {
        // test the element for the user tagger stuff, we need to remove that from 
        const indexOfUserTaggerElementsStart = elementHTML.indexOf('<div class="user-tagger__tag-list">');
        if(indexOfUserTaggerElementsStart > -1) {
            return elementHTML.substring(0, indexOfUserTaggerElementsStart).trim();
        }

        return elementHTML.trim();
    };
}