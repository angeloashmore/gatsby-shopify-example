import React, { useState } from 'react'
import { useShopifyCustomerAccessTokenWithContext } from 'react-shopify-hooks'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { object as yupObject, string as yupString } from 'yup'
import { get } from 'lodash/fp'

import { Box, Flex, Text, Input } from 'system'
import { Button } from 'src/components/Button'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = yupObject().shape({
  email: yupString()
    .email()
    .required(),
  password: yupString().required(),
})

export const SignInForm = props => {
  const [error, setError] = useState(null)
  const {
    actions: { signIn },
  } = useShopifyCustomerAccessTokenWithContext()

  const onSubmit = async ({ email, password }, { setSubmitting }) => {
    setError(null)
    const { errors } = await signIn(email, password)
    if (errors) setError(get('[0].message', errors))
    setSubmitting(false)
  }

  return (
    <Box {...props}>
      {error && <Text color="red">{error}</Text>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Box as={Form}>
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
          </Box>
        )}
      </Formik>
    </Box>
  )
}
