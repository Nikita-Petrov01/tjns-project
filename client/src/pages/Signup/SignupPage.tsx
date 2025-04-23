import React from 'react'
import { Container } from 'react-bootstrap'
import SignupForm from '../../features/signup/ui/SignupForm'

function SignupPage(): React.JSX.Element {
  return (
    <Container className='d-flex justify-content-center'>
      <SignupForm />
    </Container>
  )
}

export default SignupPage