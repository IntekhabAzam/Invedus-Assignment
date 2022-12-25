import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ContactForm from "../../components/add-contact/ContactForm";

const EditContact = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const contactsData = localStorage.getItem("contacts");

    if (contactsData) {
      setContacts(JSON.parse(contactsData));
    }
  }, []);

  const router = useRouter();
  const id = router.query.slug;

  const addContactHandler = (contact) => {
    const objIndex = contacts?.findIndex((contact) => contact.id == id);
    setContacts((prevContacts) => {
      const newArray = [...prevContacts];
      newArray[objIndex] = contact;
      return newArray;
    });
  };

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  return (
    <ContactForm id={id} identifier="edit" onAddContact={addContactHandler} />
  );
};

export default EditContact;
