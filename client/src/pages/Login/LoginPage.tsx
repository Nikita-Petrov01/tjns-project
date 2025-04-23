import React from 'react'
import { Container } from 'react-bootstrap'
import LoginForm from '../../features/login/ui/LoginForm'

function LoginPage(): React.JSX.Element {
  return (
    <Container className='d-flex justify-content-center'>
      <LoginForm />
    </Container>
  )
}

export default LoginPage