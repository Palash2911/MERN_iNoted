import { Context, createContext } from "react";

const notecontext = createContext();


// Context is used so that when a component needs some state it does not have to take from parent can directly take from here

export default notecontext;
