import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getAdmin } from '../../entities/user/model/userThunks';
import { getProducts } from '../../entities/products/model/productThunk';
import { useNavigate } from 'react-router';
import SignUpAdminModal from '../../shared/ui/signUpAdminModal/SignUpAdminModal';

export default function SuperAdminPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);
  const admins = useAppSelector((state) => state.user.admin);
  const products = useAppSelector((state) => state.products.products);

  useEffect(() => {
    void dispatch(getAdmin());
    void dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Панель Администратора</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-100 p-4 rounded-lg text-center shadow">
          <p className="text-sm text-gray-500">Всего товаров</p>
          <p className="text-xl font-semibold">{products.length}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg text-center shadow flex flex-col items-center">
          <p className="text-sm text-gray-500">Админов</p>
          <p className="text-xl font-semibold mb-2">{admins.length}</p>
          {user?.status === 'superadmin' && <SignUpAdminModal />}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg text-center shadow flex flex-col items-center">
          <p className="text-sm text-gray-500">Пользователей</p>
          <p className="text-xl font-semibold mb-2">{admins.length}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Сотрудники</h2>
          <button
            onClick={() => navigate('/products/create')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Добавить товар
          </button>
        </div>

        <ul className="space-y-2">
          {admins.map((admin) => (
            <li key={admin.id} className="bg-gray-50 px-4 py-2 rounded-lg shadow-sm text-gray-800">
              {admin.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => navigate('/admin/products')}
          className="text-blue-600 underline hover:text-blue-800"
        >
          Перейти к списку товаров
        </button>
        <button
          onClick={() => navigate('/categories')}
          className="text-blue-600 underline hover:text-blue-800 block"
        >
          Управление категориями
        </button>
      </div>
    </div>
  );
}
