import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch } from '../../../shared/lib/hooks';
import { userFormSchema } from '../../../entities/user/model/schema';
import { signupUserThunk } from '../../../entities/user/model/userThunks'; // <<< меняем импорт
import { Link, useNavigate } from 'react-router';

function SignupForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const validatedData = userFormSchema.parse(data);

    dispatch(signupUserThunk(validatedData)) // <<< меняем на signupUserThunk
      .unwrap()
      .then(() => navigate('/'))
      .catch(console.error);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Form
        onSubmit={submitHandler}
        className="p-4 rounded shadow bg-white"
        style={{ minWidth: 350 }}
      >
        <h2 className="text-center mb-4">Регистрация</h2>

        <Form.Group className="mb-3">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control name="name" type="text" placeholder="Введите имя" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Введите email" required />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Пароль</Form.Label>
          <Form.Control name="password" type="password" placeholder="Введите пароль" required />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Зарегистрироваться
        </Button>

        <div className="text-center">
          <Link to="/login">Уже есть аккаунт? Войти</Link>
        </div>
      </Form>
    </div>
  );
}

export default SignupForm;
