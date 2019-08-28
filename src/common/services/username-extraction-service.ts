import { IUsernameExtractionService } from "../abstract-types";

export default class UsernameExtractionService implements IUsernameExtractionService {
    extract: (elementHTML: string) => string;
}