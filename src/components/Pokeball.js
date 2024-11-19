import React from 'react';

const Pokeball = (props) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="5"/>
    <path d="M5 50h90" stroke="black" strokeWidth="5"/>
    <circle cx="50" cy="50" r="15" fill="white" stroke="black" strokeWidth="5"/>
    <circle cx="50" cy="50" r="10" fill="black"/>
  </svg>
);

export default Pokeball;
