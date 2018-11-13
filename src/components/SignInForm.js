import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { object as yupObject, string as yupString } from 'yup'

export const SignInForm = ({ onSubmit, ...props }) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    validationSchema={yupObject().shape({
      email: yupString()
        .email()
        .required(),
      password: yupString().required(),
    })}
    onSubmit={onSubmit}
  >
    {({ isValid, isSubmitting }) => (
      <Form {...props}>
        <div>
          <label>
            <span>Email</span>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </label>
        </div>
        <div>
          <label>
            <span>Password</span>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />
          </label>
        </div>
        <button type="submit" disabled={!isValid || isSubmitting}>
          Sign In
        </button>
      </Form>
    )}
  </Formik>
)
