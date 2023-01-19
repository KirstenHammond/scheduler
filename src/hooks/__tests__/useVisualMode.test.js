//Jest test for custom hook useVisualMode

import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

describe("useVisualMode custom hook tests", () => {

  //Initialise
  test("1. useVisualMode should initialize with default value", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));
  
    expect(result.current.mode).toBe(FIRST);
  });
  
  //Transition
  test("2. useVisualMode should transition to another mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));
  
    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);
  });
  
  //Back
  test("3. useVisualMode should return to previous mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));
  
    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);
  
    act(() => result.current.transition(THIRD));
    expect(result.current.mode).toBe(THIRD);
  
    act(() => result.current.back());
    expect(result.current.mode).toBe(SECOND);
  
    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });
  
  //Limit on back
  test("4. useVisualMode should not return to previous mode if already at initial", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));
  
    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });
  
  //Skip a mode
  test("5. useVisualMode should replace the current mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));
  
    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);
  
    // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
    act(() => result.current.transition(THIRD, true));
    expect(result.current.mode).toBe(THIRD);
  
    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });

})
