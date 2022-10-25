import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (oldState, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: oldState.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: oldState.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return inputStateReducer;
};

function useInput(validateValue) {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const classes = hasError ? "form-control invalid" : "form-control";

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    classes,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
}

export default useInput;
