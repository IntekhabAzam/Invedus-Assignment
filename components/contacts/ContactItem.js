import React from "react";
import Link from "next/link";
import Card from "../ui/Card";
import classes from "./ContactItem.module.css";

const ContactItem = (props) => {
  return (
    <li>
      <Card className={classes["contact-item"]}>
        <div className={classes["contact-details"]}>
          <div>
            <h3 className={classes.name}>{props.name}</h3>
            <div>
              {props.phone} ({props.type})
            </div>
            {props.isWhatsapp === true && <div className={classes.isWhatsapp}>Whatsapp available</div>}
          </div>
          <a href={props.image} rel="noreferrer" target="_blank">
            <img src={props.image} alt="" className={classes["profile-picture"]} />
          </a>
        </div>
        <div className={classes.action}>
          <Link href={`/edit-contact/${props.id}`}>
            <button type="button" className={classes.button}>
              Edit
            </button>
          </Link>
          <button
            type="buton"
            className={classes.button}
            onClick={props.onDelete}
          >
            Delete
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ContactItem;
