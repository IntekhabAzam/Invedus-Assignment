import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Card from "../ui/Card";
import classes from "./ContactForm.module.css";
import { fireDb } from "../../firebaseConfig/firebase";
import { uid } from "uid";
import { ref, set, onValue, update } from "firebase/database";

const ContactForm = (props) => {
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const imageInputRef = useRef();
  const typeInputRef = useRef();
  const whatsappInputRef = useRef();

  const router = useRouter();

  useEffect(() => {
    if (props.dynamicId) {
      onValue(ref(fireDb), (data) => {
        const responseData = data.val();

        const selectedContact = responseData[props.dynamicId];
        nameInputRef.current.value = selectedContact.name;
        phoneInputRef.current.value = selectedContact.phone;
        typeInputRef.current.value = selectedContact.type;
        whatsappInputRef.current.checked = selectedContact.isWhatsapp;
        imageInputRef.current.value = selectedContact.image;
      });
    }
  }, [props.dynamicId]);

  async function submitHandler(event) {
    event.preventDefault();

    const uuid = uid();

    const contactData = {
      name: nameInputRef.current.value,
      phone: phoneInputRef.current.value,
      type: typeInputRef.current.value,
      isWhatsapp: whatsappInputRef.current.checked,
      image: imageInputRef.current.value,
    };

    if (props.dynamicId) {
      update(ref(fireDb, `/${props.dynamicId}`), contactData);
    } else {
      set(ref(fireDb, `/${uuid}`), contactData);
    }

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
        <div className={classes.isWhatsapp}>
          <p>isWhatsapp</p>
          <label htmlFor="isWhatsapp">Yes</label>
          <input
            type="checkbox"
            id="isWhatsapp"
            name="isWhatsapp"
            value="Yes"
            ref={whatsappInputRef}
          />
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
