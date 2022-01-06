import React from 'react';
import PropTypes from 'prop-types';
import { formInfoShape } from 'src/helpers/form';

export default function FormError({ for: fieldName, formInfo }) {
  const { errors, touched } = formInfo;

  return (
    <div className="form-text text-error">
      {errors[fieldName] && touched[fieldName] && (
        <div>{errors[fieldName]}</div>
      )}
    </div>
  );
}

FormError.propTypes = {
  for: PropTypes.string.isRequired,
  formInfo: formInfoShape.isRequired,
};
