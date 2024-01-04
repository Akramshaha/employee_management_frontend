import { useEffect, useState } from "react";

function useLocalState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const localStorageVal = localStorage.getItem(key);
        console.log(localStorageVal+" :: "+defaultValue);
        return localStorageVal !== null ?JSON.parse(localStorageVal) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key,JSON.stringify(value))
    },[key, value]);

    return [value, setValue];
}

export {useLocalState};
