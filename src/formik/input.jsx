import { ErrorMessage, Field } from "formik";
import React from "react";

export const FormikInput = ({
  ref = false,
  type,
  id,
  label,
  fieldClass,
  disable = false,
  value = false, // default value set to false
}) => {
  return (
    <div className={fieldClass}>
      <label htmlFor={id}>{label}</label>
      {value ? (
        <Field
          type={type}
          id={id}
          name={id}
          placeholder={label}
          value={value}
          disabled={disable} // Corrected "disabeld" to "disabled"
        />
      ) : (
        <Field
          type={type}
          id={id}
          name={id}
          placeholder={label}
          disabled={disable} // Corrected "disabeld" to "disabled"
        />
      )}

      <ErrorMessage name={id} component="p" />
    </div>
  );
};
