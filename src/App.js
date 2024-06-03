import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import {useImmer} from "use-immer"
import _ from "lodash";
//Underline or Underscore
import {Icons, ToastContainer,toast} from "react-toastify";
import { ContactContext } from "./context/contactContext";
import {
  AddContact,
  ViewContact,
  Contacts,
  EditContact,
  Navbar,
} from "./components";

import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService";

import "./App.css";
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/colors";
// import { contactSchema } from "./validations/contactValidation";

const App = () => {
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  // const [contact, setContact] = useState({});
  const [errors, setErrors] = useImmer([]);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Contact Manager App 🐧 ");

    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createContactForm = async (values) => {
    // event.preventDefault();
    try {
      setLoading(draft => !draft);

      // await contactSchema.validate(contact,{abortEarly:false});

      const { status, data } = await createContact(values);

      if (status === 201) {
        toast.success("مخاطب با موفقیت ایجاد شد" , {icon:"🦄"})
        // const allContacts = [...contacts, data];

        // setContacts(allContacts);
        // setFilteredContacts(allContacts);

setContacts((draft)=>{draft.push(data)});
setFilteredContacts((draft)=>{draft.push(data)});


        // setContact({});
        setErrors([]);
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      // setErrors(err.inner);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  // const onContactChange = (event) => {
  //   setContact({
  //     ...contact,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
   
    // Contacts Copy
    const contactsBackup = [...contacts];
    try {
      // const updatedContact = contacts.filter((c) => c.id !== contactId);
      setContacts((draft)=>draft.filter((c) => c.id !== contactId));
           setFilteredContacts((draft)=>draft.filter((c) => c.id !== contactId));

      // Sending delete request to server
      const { status } = await deleteContact(contactId);

      toast.error("مخاطب با موفقیت حذف شد",{icon:"💣"});
      if (status !== 200) {
        setContacts(contactsBackup);
        setFilteredContacts(contactsBackup);
      }
    } catch (err) {
      console.log(err.message);

      setContacts(contactsBackup);
      setFilteredContacts(contactsBackup);
    }
  };

  // let filterTimeout;
  const contactSearch = _.debounce((query) => {
        if (!query) return setFilteredContacts([...contacts]);
      //   setFilteredContacts(
      // contacts.filter((contact) => {
      //   return contact.fullname.toLowerCase().includes(query.toLowerCase());
      // })
      setFilteredContacts((draft)=>draft.filter((c)=>c.fullname.toLowerCase().includes(query.toLowerCase())))
 
    // }, 1000);
  }, 1000);

  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        setContacts,
        setFilteredContacts,
        contacts,
        filteredContacts,
        groups,
        // errors,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <ToastContainer rtl={true} position="top-right" theme="colored" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="contacts/add" element={<AddContact />} />
          <Route path="contacts/:contactId" element={<ViewContact />} />
          <Route path="contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
