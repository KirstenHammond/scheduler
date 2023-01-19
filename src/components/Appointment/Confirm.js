//Option to click Cancel or Confirm when deleting an appointment

import React from "react";
import Button from "components/Button";

import PropTypes from "prop-types";

export default function Confirm(props) {


  const {message, onCancel, onConfirm} = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button onClick={onCancel} danger>
          Cancel
        </Button>
        <Button onClick={onConfirm} danger>
          Confirm
        </Button>
      </section>
    </main>
  );
}

Confirm.ropTypes = {
  message: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
}