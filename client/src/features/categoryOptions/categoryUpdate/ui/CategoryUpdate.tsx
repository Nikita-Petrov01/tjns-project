import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import { categorySchema } from '../../../../entities/category/model/categorySchema';
import { updateCategory } from '../../../../entities/category/model/categoryThunks';

export default function CategoryUpdate(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const categoryId = useAppSelector((store) => store.categories.category?.id);

  const categoryEdit = useAppSelector((store) =>
    store.categories.categories.find((category) => category.id === Number(categoryId)),
  );

  const editCategoryHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));
      const validatedData = categorySchema.parse(formData);
      void dispatch(updateCategory({ id: Number(categoryId), data: validatedData }));
    } catch (error) {
      console.error('Ошибка обновление категории', error);
    }
  };

  return (
    <>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={editCategoryHandler}>
        <label htmlFor="name">Введите название категорию</label>
        <input
          type="text"
          name="name"
          defaultValue={categoryEdit?.name}
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
    </>
  );
}
