import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { useAppDispatch } from '../../../shared/lib/hooks';
import { userLoginFormSchema } from '../../../entities/user/model/schema';
import { loginUser } from '../../../entities/user/model/userThunks';

function LoginForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const validatedData = userLoginFormSchema.parse(data);
    dispatch(loginUser(validatedData))
      .unwrap()
      .then(void navigate('/restaurants'))
      .catch(console.error);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Form
        onSubmit={submitHandler}
        className="p-4 rounded shadow bg-white"
        style={{ minWidth: 350 }}
      >
        <h2 className="text-center mb-4">Вход</h2>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Введите email" required />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Пароль</Form.Label>
          <Form.Control name="password" type="password" placeholder="Введите пароль" required />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Войти
        </Button>

        <div className="text-center">
          <Link to="/signup">Нет аккаунта? Зарегистрируйтесь</Link>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
