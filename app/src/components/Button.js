import React from "react";

const Button = props => (
  <button className="nextButton" onClick={props.clickHandler}>
    Next
  </button>
);

export default Button;
