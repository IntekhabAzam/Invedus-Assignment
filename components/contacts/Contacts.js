import React, { useEffect, useState } from "react";
import classes from "./Contacts.module.css";
import Link from "next/link";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const contactsData = localStorage.getItem("contacts");

    if (contactsData) {
      setContacts(JSON.parse(contactsData));
    }
  }, []);

  const deleteHandler = (contactId) => {
    if (confirm("Press ok to delete the contact") === true) {
      setContacts((prevContacts) => {
        const updatedGoals = prevContacts.filter(
          (contact) => contact.id !== contactId
        );
        return updatedGoals;
      });
    }
  };

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    } else {
      localStorage.removeItem("contacts");
    }
  }, [contacts]);

  let content = (
    <div className={classes.fallback}>
      <h4>No Contacts Saved</h4>
      <Link href="./add-contact">
        <button type="button" className={classes.button}>
          Add Contact
        </button>
      </Link>
    </div>
  );
  if (contacts.length > 0) {
    content = contacts?.map((contact) => {
      return (
        <ContactItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          phone={contact.phone}
          type={contact.type}
          isWhatsapp={contact.isWhatsapp}
          image={contact.image}
          onDelete={deleteHandler.bind(null, contact.id)}
        />
      );
    });
  }

  return <ul className={classes["contact-list"]}>{content}</ul>;
};

export default Contacts;
