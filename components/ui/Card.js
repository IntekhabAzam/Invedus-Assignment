import classes from './Card.module.css';

function Card(props) {
    const cardClasses = `${classes.card}  ${props.className}`;

  return <div className={cardClasses}>{props.children}</div>;
}

export default Card;

// import React from 'react'
// import classes from './Card.module.css';

// export default function Card(props) {

//     const lasses = `${classes.card}  ${props.className}`;
//   return (
//     <div className = {lasses}>{props.children}</div>
//   )
// }