//Jest tests for helper selector functions

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../selectors";

//Mock data
import state from "../../__mocks__/stateMock"

describe("Selector function test", () => {

  //Using test instead of it
  test("1. getAppointmentsForDay returns an array", () => {
    const result = getAppointmentsForDay(state, "Monday");
    expect(Array.isArray(result)).toBe(true);
  });

  test("2. getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
    const result = getAppointmentsForDay(state, "Monday");
    expect(result.length).toEqual(3);
  });

  test("3. getAppointmentsForDay returns an array containing the correct appointment objects", () => {
    const [first, second] = getAppointmentsForDay(state, "Tuesday");
    expect(first).toEqual(state.appointments["4"]);
    expect(second).toEqual(state.appointments["5"]);
  });

  test("4. getAppointmentsForDay returns an empty array when the days data is empty", () => {
    const result = getAppointmentsForDay({ days: [] }, "Monday");
    expect(result.length).toEqual(0);
  });

  test("5. getAppointmentsForDay returns an empty array when the day is not found", () => {
    const result = getAppointmentsForDay(state, "Wednesday");
    expect(result.length).toEqual(0);
  });

  //getInterviewer test
  test("6. getInterview returns an object with the interviewer data", () => {
    const result = getInterview(state, state.appointments["3"].interview);
    expect(result).toEqual(
      expect.objectContaining({
        student: expect.any(String),
        interviewer: expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          avatar: expect.any(String),
        }),
      })
    );
  });

  test("7. getInterview returns null if no interview is booked", () => {
    const result = getInterview(state, state.appointments["2"].interview);
    expect(result).toBeNull();
  });

  //getInterviewersForDay tests
  test("8. getInterviewersForDay returns an array", () => {
    const result = getInterviewersForDay(state, "Monday");
    expect(Array.isArray(result)).toBe(true);
  });

  test("9. getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
    const result = getInterviewersForDay(state, "Monday");
    expect(result.length).toEqual(2);
  });

  test("10. getInterviewersForDay returns an array containing the correct interviewer objects", () => {
    const [first, second] = getInterviewersForDay(state, "Tuesday");
    expect(first).toEqual(state.interviewers["2"]);
    expect(second).toEqual(state.interviewers["3"]);
  });

  test("11. getInterviewersForDay returns an empty array when the days data is empty", () => {
    const result = getInterviewersForDay({ days: [] }, "Monday");
    expect(result.length).toEqual(0);
  });

  test("12. getInterviewersForDay returns an empty array when the day is not found", () => {
    const result = getInterviewersForDay(state, "Wednesday");
    expect(result.length).toEqual(0);
  });

})
