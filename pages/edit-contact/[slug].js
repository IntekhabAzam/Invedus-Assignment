import React from "react";
import { useRouter } from "next/router";
import ContactForm from "../../components/add-contact/ContactForm";

const EditContact = () => {
  const router = useRouter();
  const id = router.query.slug;

  const addContactHandler = (contact) => {
    console.log(contact);
  };

  return (
    <ContactForm id={id} onAddContact={addContactHandler} />
  );
};

export default EditContact;
