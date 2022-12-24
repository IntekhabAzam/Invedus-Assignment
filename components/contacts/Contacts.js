import React, { useEffect, useState } from "react";
import Card from "../ui/Card";
import classes from "./Contacts.module.css";
import Link from "next/link";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    if (
      localStorage.getItem("contacts") !== "undefined" &&
      localStorage.getItem("contacts") !== ""
    ) {
      setContacts(JSON.parse(localStorage.getItem("contacts")));
    }
  }, []);

  const deleteHandler = (contactId) => {
    if (confirm("Do you want to delete") === true) {
      setContacts((prevContacts) => {
        const updatedGoals = prevContacts.filter(
          (contact) => contact.id !== contactId
        );
        return updatedGoals;
      });
    }
  };

  useEffect(() => {
    contacts.length > 0
      ? localStorage.setItem("contacts", JSON.stringify(contacts))
      : localStorage.setItem("contacts", "");
  }, [contacts]);

  const contactsList = contacts?.map((contact) => {
    return (
      <li key={contact.id}>
        <Card className={classes["contact-item"]}>
          <div className={classes["contact-details"]}>
            <div>
              <h3 className={classes.name}>{contact.name}</h3>
              <div className={classes.description}>
                {contact.phone} ({contact.type})
              </div>
            </div>
            <div className={classes["profile-picture"]}>
              <a href={contact.image} rel="noreferrer" target="_blank">
                Profile Picture Link
              </a>
            </div>
          </div>
          <div className={classes.action}>
            <Link key={contact.id} href={`/edit-contact/${contact.id}`}>
              <button type="button" className={classes.button}>
                Edit
              </button>
            </Link>
            <button
              type="buton"
              className={classes.button}
              onClick={deleteHandler.bind(null, contact.id)}
            >
              Delete
            </button>
          </div>
        </Card>
      </li>
    );
  });

  let content = (
    <div className={classes.fallback}>
      <p>No Contacts Saved</p>
      <Link href="./add-contact">
        <button type="button" className={classes.button}>
          Add New Contact
        </button>
      </Link>
    </div>
  );

  if (contacts && contacts.length > 0){
    content = contactsList;
  }

  return (
    <ul className={classes["contact-list"]}>
      {content}
    </ul>
  );
};

export default Contacts;
