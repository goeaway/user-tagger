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

    get = <T>(key: string) : T => {
        if(!key) {
            return undefined;
        }

        const localStorageStr = window.localStorage.getItem(key);

        return localStorageStr && JSON.parse(this.decode(localStorageStr)) as T;
    }  

    set = <T>(key: string, value: T) => {
        if(!key) {
            throw "Key was not usable (" + key + ")";
        }

        let valueStr = JSON.stringify(value);

        window.localStorage.setItem(key, this.encode(valueStr));
    }


}