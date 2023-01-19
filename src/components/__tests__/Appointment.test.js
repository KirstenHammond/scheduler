//Jest tests for src/components/Appointment/index.js

import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment/index.js";

afterEach(cleanup);

describe("Appointment tests", () => {
  it("1. Renders without crashing", () => {
    render(<Appointment />);
  });
});
