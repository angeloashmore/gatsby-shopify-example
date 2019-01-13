import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { object as yupObject, string as yupString } from 'yup'

import { Flex, Text, Input } from 'system'
import { Button } from 'src/components/Button'

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
        <Flex as="label" mb={2}>
          <Text width="6rem">Email</Text>
          <Input as={Field} name="email" type="email" />
          <Text ml={2}>
            <ErrorMessage name="email" />
          </Text>
        </Flex>
        <Flex as="label" mb={2}>
          <Text width="6rem">Password</Text>
          <Input as={Field} name="password" type="password" />
          <Text ml={2}>
            <ErrorMessage name="password" />
          </Text>
        </Flex>
        <Button type="submit" disabled={!isValid || isSubmitting} ml="6rem">
          Sign In
        </Button>
      </Form>
    )}
  </Formik>
)
