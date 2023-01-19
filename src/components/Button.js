import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "../styles/Button.scss"

export default function Button(props) {

  const {confirm, danger, onClick, disabled, children} = props;

  //importing classnames instead of using conditionals
  const buttonClass = classnames("button", {
    "button--confirm": confirm,
    "button--danger": danger,
  });
 
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  confirm: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.string
}