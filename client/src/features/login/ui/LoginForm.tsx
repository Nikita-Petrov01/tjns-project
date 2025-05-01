import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { userLoginFormSchema } from '../../../entities/user/model/schema';
import { loginUser } from '../../../entities/user/model/userThunks';
import { Link, useNavigate } from 'react-router';
import { mergeGuestChatWithUser } from '../../../entities/chat/model/chatThunks';

export default function LoginForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const guestId = useAppSelector((state) => state.user.guestId);
  const chat = useAppSelector((state) => state.chat.chat);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const validatedData = userLoginFormSchema.parse(data);
    try {
      void dispatch(loginUser(validatedData)).unwrap().then((user) => {
                if (guestId && chat?.id) {
                  return dispatch(mergeGuestChatWithUser({ guestId, userId: user.id })).unwrap();
                }
              })
        .then(() => navigate('/'))
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#F2F2F2] to-[#E0F2EF] px-6 py-12">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-2xl bg-white text-[#182628] p-12 rounded-[3rem] shadow-2xl space-y-10 scale-[1.1]"
      >
        <h2 className="text-4xl font-bold text-center text-[#3B945E]">Вход</h2>

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
          className="w-full py-4 rounded-full bg-[#3B945E] text-white font-bold text-xl hover:bg-[#57BA98] transition duration-300 shadow-lg"
        >
          Войти
        </button>

        <p className="text-center text-base text-[#182628]">
          Нет аккаунта?{' '}
          <Link to="/signup" className="text-[#3B945E] hover:underline">
            Зарегистрируйтесь
          </Link>
        </p>
      </form>
    </div>
  );
}
