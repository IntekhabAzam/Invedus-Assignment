import React from "react";
import { useRouter } from "next/router";
import ContactForm from "../../components/add-contact/ContactForm";

const EditContact = () => {
  
  const router = useRouter();
  const id = router.query.slug;

  return (
    <ContactForm dynamicId={id} />
  );
};

export default EditContact;
