import React, { useState, useEffect } from "react";
import ContactForm from "../components/add-contact/ContactForm";

const AddContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const contactsData = localStorage.getItem("contacts");

    if (contactsData) {
      setContacts(JSON.parse(contactsData));
    }
  }, []);

  const addContactHandler = (contact) => {
    setContacts((prevContacts) => {
      return [contact, ...prevContacts];
    });
  };

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  return <ContactForm onAddContact={addContactHandler} />;
};

export default AddContact;
