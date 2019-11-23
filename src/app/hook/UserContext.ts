import { createContext } from "react";

class User {
    name: string;
    constructor() {
        this.name = "";
    }
}

var user = new User();

export var UserContext = createContext(user);