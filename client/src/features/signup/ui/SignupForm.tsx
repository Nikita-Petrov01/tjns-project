import React from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks';
import { userFormSchema } from '../../../entities/user/model/schema';
import { Link, useNavigate } from 'react-router';
import { signupUser } from '../../../entities/user/model/userThunks';
import { transferGuestCartToServer } from '../../../entities/cart/model/cartThunks';
import { clearCartLocally } from '../../../entities/cart/model/cartSlice';

export default function SignupForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const validatedData = userFormSchema.parse(data);
    try {
      void dispatch(signupUser(validatedData))
        .then(() => dispatch(transferGuestCartToServer()).unwrap())
        .then(() => navigate('/'))
        .then(() => dispatch(clearCartLocally()))
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-[#EDF5E1] to-[#8EE4AF] px-4 sm:px-6 py-20 sm:py-24 font-roboto">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md sm:max-w-lg bg-white text-[#05386B] p-8 sm:p-10 rounded-3xl shadow-lg space-y-8 animate-fadeIn"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#05386B]">
          Регистрация
        </h2>

        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm sm:text-base font-medium">
            Имя пользователя
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Введите имя"
            className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#EDF5E1] text-[#05386B] placeholder-[#05386B]/60 focus:outline-none focus:ring-2 focus:ring-[#5CD8B5] hover:border-[#5CD8B5] border-2 border-[#379683] transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm sm:text-base font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Введите email"
            className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#EDF5E1] text-[#05386B] placeholder-[#05386B]/60 focus:outline-none focus:ring-2 focus:ring-[#5CD8B5] hover:border-[#5CD8B5] border-2 border-[#379683] transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm sm:text-base font-medium">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Введите пароль"
            className="w-full px-4 sm:px-5 py-3 rounded-xl bg-[#EDF5E1] text-[#05386B] placeholder-[#05386B]/60 focus:outline-none focus:ring-2 focus:ring-[#5CD8B5] hover:border-[#5CD8B5] border-2 border-[#379683] transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#379683] text-[#EDF5E1] font-semibold rounded-xl hover:bg-[#5CD8B5] transition-all duration-200 shadow-md hover:scale-105"
        >
          Зарегистрироваться
        </button>

        <p className="text-center text-sm sm:text-base text-[#05386B]">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-[#379683] hover:text-[#5CD8B5] hover:underline transition-colors duration-200">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}