import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  // contact: {},
  setContacts: () => {},
  setFilteredContacts: () => {},
  contacts: [],
  errors: [],
  filteredContacts: [],
  contactQuery: {},
  groups: [],
  // onContactChange: () => {},
  deleteContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
});
