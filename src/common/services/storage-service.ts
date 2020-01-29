import { IStorageService } from "../abstract-types";

export default class StorageService implements IStorageService {
    private decode = (str: string) : string => {
        str = decodeURIComponent(str);

        if(atob) {
            str = atob(str);
        }

        return str;
    }

    private encode = (str: string) : string => {
        if(btoa) {
            str = btoa(str);
        }
        
        str = encodeURIComponent(str);
        return str;
    }

    private matchesKey = (key: string, matcher: string) : boolean => {
        // for this solution to work on any string, no matter what characters it has
        var escapeRegex = (str: string) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");

        // "."  => Find a single character, except newline or line terminator
        // ".*" => Matches any string that contains zero or more characters
        matcher = matcher.split("*").map(escapeRegex).join(".*");

        // "^"  => Matches any string with the following at the beginning of it
        // "$"  => Matches any string with that in front at the end of it
        matcher = "^" + matcher + "$"

        //Create a regular expression object for matching string
        var regex = new RegExp(matcher);

        //Returns true if it finds a match, otherwise it returns false
        return regex.test(key);
    }

    get = <T>(key: string) : T => {
        if(!key) {
            return undefined;
        }

        const localStorageStr = window.localStorage.getItem(key);

        return localStorageStr && JSON.parse(this.decode(localStorageStr)) as T;
    }  

    getMatchingKey = <T>(key: string) : Array<T> => {
        const results : Array<T> = [];
        for(let i = 0; i < window.localStorage.length; i++) {
            const keyFromStorage = window.localStorage.key(i);
            if(this.matchesKey(keyFromStorage, key)) {
                results.push(this.get<T>(keyFromStorage));
            }
        }

        return results;
    }

    set = <T>(key: string, value: T) => {
        if(!key) {
            throw "Key was not usable (" + key + ")";
        }

        let valueStr = JSON.stringify(value);

        window.localStorage.setItem(key, this.encode(valueStr));
    }
}