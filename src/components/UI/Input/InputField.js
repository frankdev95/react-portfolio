import Tooltip from "../Tooltip/Tooltip";

const createInputField = (props) => {
  return {
    input: <input {...props} />,
    textarea: <textarea {...props} rows={5} />,
  };
};

const InputField = (props) => {
  const {
    label,
    placeholder,
    type,
    name,
    element,
    handleChange,
    handleBlur,
    errorMessage,
    isValid,
    isTouched,
    value,
    styles,
  } = props;

  return (
    <div
      className={`${styles["form__group"]} u-flex u-flex-column u-clr-white`}
    >
      {label && <label htmlFor="">{label}</label>}
      {
        createInputField({
          onChange: handleChange,
          onBlur: handleBlur,
          type,
          name,
          value,
          placeholder,
        })[element]
      }
      {!isValid && errorMessage && isTouched && (
        <Tooltip text={errorMessage} position="left" theme="light" />
      )}
    </div>
  );
};

export default InputField;
