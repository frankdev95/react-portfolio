import { useState } from "react";

const useForm = (formObj, styles) => {
  const [form, setForm] = useState(formObj);

  const renderFormInputs = () => {
    return Object.values(form).map((inputObj) => {
      const { renderFormInput, value, isValid, errorMessage, touched } =
        inputObj;

      return renderFormInput(
        onInputChange,
        onBlur,
        value,
        isValid,
        errorMessage,
        touched,
        styles
      );
    });
  };

  const onInputChange = (e) => {
    const { value, name } = e.target;
    const inputObj = { ...form[name] };

    inputObj.value = value;
    const isInputValid = isInputFieldValid(inputObj);

    if (!isInputValid && inputObj.isValid) inputObj.isValid = false;
    if (isInputValid && !inputObj.isValid) inputObj.isValid = true;
    if (!inputObj.touched) inputObj.touched = true;

    setForm({ ...form, [name]: inputObj });
  };

  const onBlur = (e) => {
    const { name } = e.target;
    const inputObj = { ...form[name] };

    if (inputObj.touched) inputObj.touched = false;

    setForm({ ...form, [name]: inputObj });
  };

  const isInputFieldValid = (inputObj) => {
    if (inputObj.validationRules) {
      for (const rule of inputObj.validationRules) {
        if (!rule.validate(inputObj.value)) {
          inputObj.errorMessage = rule.message;
          return false;
        }
      }
    }

    return true;
  };

  const isFormValid = () => {
    for (const inputObj of Object.values(form)) {
      if (inputObj.validationRules && !inputObj.isValid) return false;
    }
    return true;
  };

  return { renderFormInputs, isFormValid };
};

export default useForm;
