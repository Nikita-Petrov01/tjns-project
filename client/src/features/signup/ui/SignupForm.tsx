import React from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks';
import { userFormSchema } from '../../../entities/user/model/schema';
import { signupUserThunk } from '../../../entities/user/model/userThunks';
import { Link, useNavigate } from 'react-router';

export default function SignupForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const validatedData = userFormSchema.parse(data);

    dispatch(signupUserThunk(validatedData))
      .unwrap()
      .then(() => navigate('/'))
      .catch(console.error);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#F2F2F2] to-[#E0F2EF] px-6 py-12">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-2xl bg-white text-[#182628] p-12 rounded-[3rem] shadow-2xl space-y-10 scale-[1.1]"
      >
        <h2 className="text-4xl font-bold text-center text-[#3B945E]">Регистрация</h2>

        <div className="space-y-3">
          <label htmlFor="name" className="block text-base">
            Имя пользователя
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Введите имя"
            className="w-full px-6 py-4 rounded-[1.5rem] bg-[#E0F2EF] text-[#182628] placeholder-[#57BA98] focus:outline-none focus:ring-4 focus:ring-[#65CCB8]"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="email" className="block text-base">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Введите email"
            className="w-full px-6 py-4 rounded-[1.5rem] bg-[#E0F2EF] text-[#182628] placeholder-[#57BA98] focus:outline-none focus:ring-4 focus:ring-[#65CCB8]"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="password" className="block text-base">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Введите пароль"
            className="w-full px-6 py-4 rounded-[1.5rem] bg-[#E0F2EF] text-[#182628] placeholder-[#57BA98] focus:outline-none focus:ring-4 focus:ring-[#65CCB8]"
          />
        </div>

        <button
  type="submit"
  className="px-6 py-3 bg-[#3B945E] text-white font-semibold rounded-full hover:bg-[#57BA98] transition-colors duration-200 shadow-md"
>
  Зарегистрироваться
</button>

        <p className="text-center text-base text-[#182628]">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-[#3B945E] hover:underline">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
