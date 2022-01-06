import { Field, Form, Formik } from 'formik';
import React, { forwardRef } from 'react';
import FormError from 'src/components/FormError';
import * as Yup from 'yup';
import { countries } from 'src/helpers/form';
import FormTextField from 'src/components/FormTextField';
import { useSelector } from 'react-redux';
import { selectBillingInformation } from 'src/features/checkout/slice';

const phoneRegexp = /^\+\d\s\d{2}\s\d{3}\s\d{2}$/;

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string()
    .matches(phoneRegexp, 'Invalid phone number')
    .required('Required'),
  country: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  zip: Yup.string().required('Required'),
});

const BillingForm = forwardRef((props, ref) => {
  const billingInfo = useSelector(selectBillingInformation);

  return (
    <Formik
      initialValues={billingInfo}
      validationSchema={ValidationSchema}
      innerRef={ref}
    >
      {(formInfo) => (
        <Form className="container-fluid p-0">
          <FormTextField name="name" label="Name" formInfo={formInfo} />
          <FormTextField name="email" label="Email" formInfo={formInfo} />
          <FormTextField name="phone" label="Phone" formInfo={formInfo} />
          <div className="row">
            <div className="col-12 col-md-3">
              <div>Country</div>
              <Field as="select" name="country" className="form-select">
                <option value="">-</option>
                {countries.map((countryName) => (
                  <option key={countryName} value={countryName}>
                    {countryName}
                  </option>
                ))}
              </Field>
              <FormError for="country" formInfo={formInfo} />
            </div>
            <FormTextField
              className="col-12 col-md-3"
              name="city"
              label="City"
              formInfo={formInfo}
            />
            <FormTextField
              className="col-12 col-md-3"
              name="address"
              label="Address"
              formInfo={formInfo}
            />
            <FormTextField
              className="col-12 col-md-3"
              name="zip"
              label="ZIP"
              formInfo={formInfo}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});

export default BillingForm;
