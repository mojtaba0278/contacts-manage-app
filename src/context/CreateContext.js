import { createContext } from "react";
export const ContactContext=createContext({
    loading:false,
    setLoading:()=>{},
    setContacts:()=>{},
    // contacts:[],
    filteredContacts:[],
    contactQuery:{},
    groups:[],
    // onContactChange:()=>{},
    deletContact:()=>{},
    updateContact:()=>{},
    contactSearch:()=>{}

})