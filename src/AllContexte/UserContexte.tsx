import {createContext} from "react";


export const UserContexte = createContext({
        isLogUser: true,
        setIsLogUser: (isLogUser: boolean) => {}
        ,loading: true
}
);