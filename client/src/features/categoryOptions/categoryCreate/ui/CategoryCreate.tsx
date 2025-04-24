import React from 'react';
import { useAppDispatch } from '../../../../shared/lib/hooks';
import { createCategory } from '../../../../entities/category/model/categoryThunks';
import { categorySchema } from '../../../../entities/category/model/categorySchema';

export default function CategoryCreate(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const addCategoryHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const validatedData = categorySchema.parse(formData);
      void dispatch(createCategory(validatedData));
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
          Добавить категорию
        </button>
      </form>
    </div>
  );
}
