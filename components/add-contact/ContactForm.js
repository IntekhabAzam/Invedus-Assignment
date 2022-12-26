import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Card from "../ui/Card";
import classes from "./ContactForm.module.css";

const ContactForm = (props) => {
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const imageInputRef = useRef();
  const typeInputRef = useRef();

  const router = useRouter();

  useEffect(() => {
    if (props.identifier === "edit") {
      const contactsData = JSON.parse(localStorage.getItem("contacts"));

      const selectedContact = contactsData.filter(
        (contact) => contact.id == props.id
      );
      nameInputRef.current.value = selectedContact[0].name;
      phoneInputRef.current.value = selectedContact[0].phone;
      typeInputRef.current.value = selectedContact[0].type;
      imageInputRef.current.value = selectedContact[0].image;
    }
  }, [props.id, props.identifier]);

  function submitHandler(event) {
    event.preventDefault();

    const contactData = {
      id: Date.now(),
      name: nameInputRef.current.value,
      phone: phoneInputRef.current.value,
      type: typeInputRef.current.value,
      image: imageInputRef.current.value,
    };

    props.onAddContact(contactData);

    router.push("/");
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">name</label>
          <input type="text" required id="name" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="phone">phone</label>
          <input type="text" required id="phone" ref={phoneInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="type">type</label>
          <select id="type" name="type" ref={typeInputRef}>
            <option>personal</option>
            <option>office</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="image">profilePicture</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Add Contact</button>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;
