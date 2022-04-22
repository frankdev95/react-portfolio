const { default: InputField } = require("../components/UI/Input/InputField");

const createFormFielConfig = (
  name,
  label,
  placeholder,
  type = "text",
  element = "input",
  defaultValue = ""
) => {
  return {
    renderFormInput: (
      handleChange,
      handleBlur,
      value,
      isValid,
      errorMessage,
      touched,
      styles
    ) => (
      <InputField
        key={name}
        label={label}
        placeholder={placeholder}
        type={type}
        name={name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errorMessage={errorMessage}
        isValid={isValid}
        isTouched={touched}
        value={value}
        touched={touched}
        styles={styles}
        element={element}
      />
    ),
    value: defaultValue,
    isValid: false,
    errorMessage: "",
    touched: false,
  };
};

const createValidationRule = (ruleName, message, validateFunc) => {
  return {
    name: ruleName,
    message: message,
    validate: validateFunc,
  };
};

export const requiredRule = (inputName) => {
  return createValidationRule(
    "required",
    `${inputName} field is required`,
    (value) => !!value.trim().length
  );
};

export const contactForm = {
  name: {
    ...createFormFielConfig("name", null, "Name:"),
    validationRules: [requiredRule("Name")],
  },
  email: {
    ...createFormFielConfig("email", null, "Email:", "email"),
    validationRules: [requiredRule("Email")],
  },
  message: createFormFielConfig("message", null, "Message:", null, "textarea"),
};
