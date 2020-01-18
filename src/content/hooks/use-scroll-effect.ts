import * as React from "react";

const useScrollEffect = (onScroll: (event: any) => void, watchArray?: Array<any>) => {
    React.useEffect(() => {
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, watchArray || []);
}

export default useScrollEffect;