
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import React, { useState } from 'react';

import { userLoginFormSchema } from '../../../entities/user/model/schema';
import { loginUser } from '../../../entities/user/model/userThunks';
import { Link, useNavigate } from 'react-router';
import { mergeGuestChatWithUser } from '../../../entities/chat/model/chatThunks';

export default function LoginForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const guestId = useAppSelector((state) => state.user.guestId);
  const chat = useAppSelector((state) => state.chat.chat);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const validatedData = userLoginFormSchema.parse(data);
      void dispatch(loginUser(validatedData)).unwrap()
        .then((user) => { if (guestId && chat?.id) { return dispatch(mergeGuestChatWithUser({ guestId, userId: user.id })).unwrap())
                                                   }
                        })
        .then(() => navigate('/'));
    } catch (error) {
      setError('Неверный email или пароль');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-[#EDF5E1] to-[#8EE4AF] px-4 sm:px-6 py-20 sm:py-24 font-roboto">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md sm:max-w-lg bg-white text-[#05386B] p-8 sm:p-10 rounded-3xl shadow-lg space-y-8 animate-fadeIn"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#05386B]">
          Вход
        </h2>
        
        {error && (
          <p className="text-[#05386B] text-sm text-center bg-[#8EE4AF]/50 p-2 rounded-lg">
            {error}
          </p>
        )}

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
          disabled={isLoading}
          className={`w-full px-6 py-3 bg-[#379683] text-[#EDF5E1] font-semibold rounded-xl hover:bg-[#5CD8B5] transition-all duration-200 shadow-md hover:scale-105 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Загрузка...' : 'Войти'}
        </button>

        <p className="text-center text-sm sm:text-base text-[#05386B]">
          Нет аккаунта?{' '}
          <Link
            to="/signup"
            className="text-[#379683] hover:text-[#5CD8B5] hover:underline transition-colors duration-200"
          >
            Зарегистрируйтесь
          </Link>
        </p>
      </form>
    </div>
  );
}