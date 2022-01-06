import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import FormError from 'src/components/FormError';
import { formInfoShape } from 'src/helpers/form';

function FormTextField({ label, name, formInfo, className }) {
  return (
    <div className={`${className} mb-3`}>
      <div>{label}</div>
      <Field name={name} className="form-control" />
      <FormError for={name} formInfo={formInfo} />
    </div>
  );
}

FormTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  formInfo: formInfoShape.isRequired,
  className: PropTypes.string,
};

FormTextField.defaultProps = {
  className: '',
};

export default FormTextField;
