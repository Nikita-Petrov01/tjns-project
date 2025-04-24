import React, { useState } from 'react';
import { useAppDispatch } from '../../../../shared/lib/hooks';
import { createCategory } from '../../../../entities/category/model/categoryThunks';
import { newCategorySchema } from '../../../../entities/category/model/categorySchema';
import { useNavigate } from 'react-router';

type FormData = {
  name: string;
};

export default function CategoryCreate(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: '',
  });

  const addCategoryHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      const validatedData = newCategorySchema.parse(formData);
      void dispatch(createCategory(validatedData));
      setFormData({ name: '' });
    } catch (error) {
      console.error('Ошибка создания категории', error);
    }
  };

  return (
    <div>
      <form onSubmit={addCategoryHandler} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="name">Введите название категорию</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Введите название категорию"
          style={{
            marginBottom: '10px',
            marginTop: '5px',
            borderRadius: '8px',
            height: '40px',
            padding: '5px',
          }}
        />

        <button
          style={{
            marginBottom: '10px',
            marginTop: '5px',
            borderRadius: '8px',
            height: '40px',
            width: '100px',
            background: 'black',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Добавить
        </button>
        <button
          style={{
            marginBottom: '10px',
            marginTop: '5px',
            borderRadius: '8px',
            height: '40px',
            width: '100px',
            background: 'black',
            color: 'white',
            fontWeight: 'bold',
          }}
          onClick={() => navigate('/categories')}
        >
          Закрыть
        </button>
      </form>
    </div>
  );
}
