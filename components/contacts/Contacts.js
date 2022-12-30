import React, { useEffect, useState } from "react";
import classes from "./Contacts.module.css";
import Link from "next/link";
import ContactItem from "./ContactItem";
import { onValue, ref, remove } from "firebase/database";
import { fireDb } from "../../firebaseConfig/firebase";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    onValue(ref(fireDb), (data) => {
      const responseData = data.val();

      const loadedContacts = [];

      for (const key in responseData) {
        loadedContacts.push({
          id: key,
          name: responseData[key].name,
          phone: responseData[key].phone,
          type: responseData[key].type,
          isWhatsapp: responseData[key].isWhatsapp,
          image: responseData[key].image,
        });
      }
      setContacts(loadedContacts);
    });
  }, []);

  const deleteHandler = (contactId) => {
    console.log(contactId);
    if (confirm("Press ok to delete the contact") === true) {
      remove(ref(fireDb, `/${contactId}`));
    }
  };

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
