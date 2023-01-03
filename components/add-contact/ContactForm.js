import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Card from "../ui/Card";
import classes from "./ContactForm.module.css";
import { fireDb } from "../../firebaseConfig/firebase";
import { uid } from "uid";
import { ref, set, onValue, update } from "firebase/database";
import { storage } from "../../firebaseConfig/firebase";
import { getDownloadURL, ref as sRef, uploadBytesResumable } from "firebase/storage";

let uuid = "";

const ContactForm = ({ dynamicId }) => {
  const [progress, setProgress] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const imageInputRef = useRef();
  const typeInputRef = useRef();
  const whatsappInputRef = useRef();

  const router = useRouter();

  useEffect(() => {
    if (dynamicId) {
      onValue(ref(fireDb, `/${dynamicId}`), (data) => {
        const contactForEdit = data.val();

        setImageUrl(contactForEdit.image);
        nameInputRef.current.value = contactForEdit.name;
        phoneInputRef.current.value = contactForEdit.phone;
        typeInputRef.current.value = contactForEdit.type;
        whatsappInputRef.current.checked = contactForEdit.isWhatsapp;
      });
    }
  }, [dynamicId]);

  const onImageSelect = () => {
    dynamicId ? (uuid = dynamicId) : (uuid = uid());

    const uploadTask = uploadBytesResumable(
      sRef(storage, `images/${uuid}`),
      imageInputRef.current.files[0]
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
        })
    );
  };

  async function submitHandler(event) {
    event.preventDefault();

    const contactData = {
      name: nameInputRef.current.value,
      phone: phoneInputRef.current.value,
      type: typeInputRef.current.value,
      isWhatsapp: whatsappInputRef.current.checked,
      image: imageUrl,
    };

    if (dynamicId) {
      update(ref(fireDb, `/${dynamicId}`), contactData);
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
          <input
            type="file"
            id="image"
            ref={imageInputRef}
            onChange={onImageSelect}
          />
        </div>
        <div className={classes.actions}>
          <button disabled={progress !== null && progress < 100}>
            {dynamicId ? "Update Contact" : "Add Contact"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;
