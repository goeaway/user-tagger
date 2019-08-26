import { IStorageService } from "../abstract-types";

export default class ChromeStorageService implements IStorageService {
    get: (key: string) => {};    
    set: (key: string, value: any) => void;
}